/**
 * API helper — constructs absolute URLs for the ISO Hub api-server.
 * Uses EXPO_PUBLIC_DOMAIN in native builds; falls back to a relative path on web.
 */
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AUTH_TOKEN_KEY } from '@/lib/auth';
import { getAuthStorageItem } from '@/lib/auth-storage';

function getApiBase(): string {
  const domain = process.env.EXPO_PUBLIC_DOMAIN;
  if (domain) return `https://${domain}/api`;
  // Web preview — use relative URL
  return '/api';
}

const CACHE_PREFIX = '@iso-hub/offline-cache/v1';
const QUEUE_KEY = '@iso-hub/offline-queue/v1';
const offlineListeners = new Set<() => void>();
let online = true;
let syncing = false;
let queueLock: Promise<void> = Promise.resolve();

export interface CachedValue<T> {
  value: T;
  cachedAt: number;
}

export interface OfflineMutation {
  id: string;
  scope: string;
  resource: 'risks' | 'vendors';
  path: string;
  method: 'POST';
  body: string;
  createdAt: number;
}

export class OfflineError extends Error {
  readonly isOffline = true;

  constructor(message = 'Tidak ada koneksi internet') {
    super(message);
    this.name = 'OfflineError';
  }
}

export function isOfflineError(error: unknown): error is OfflineError {
  return error instanceof OfflineError || (typeof error === 'object' && error !== null && 'isOffline' in error && error.isOffline === true);
}

export function subscribeOfflineStatus(listener: () => void): () => void {
  offlineListeners.add(listener);
  return () => offlineListeners.delete(listener);
}

function notifyOfflineStatus(): void {
  offlineListeners.forEach(listener => listener());
}

export function getOnlineStatus(): boolean {
  return online;
}

export function getSyncingStatus(): boolean {
  return syncing;
}

async function withQueueLock<T>(operation: () => Promise<T>): Promise<T> {
  const previous = queueLock;
  let release: () => void = () => undefined;
  queueLock = new Promise<void>(resolve => {
    release = resolve;
  });
  await previous;
  try {
    return await operation();
  } finally {
    release();
  }
}

function setOnlineStatus(value: boolean): void {
  if (online === value) return;
  online = value;
  notifyOfflineStatus();
}

function cacheStorageKey(cacheKey: string, scope?: string): string {
  return `${CACHE_PREFIX}/${encodeURIComponent(scope ?? 'shared')}/${cacheKey}`;
}

export async function readCached<T>(cacheKey: string, scope?: string): Promise<CachedValue<T> | null> {
  try {
    const stored = await AsyncStorage.getItem(cacheStorageKey(cacheKey, scope));
    if (!stored) return null;
    const parsed = JSON.parse(stored) as CachedValue<T>;
    if (!parsed || typeof parsed.cachedAt !== 'number' || !('value' in parsed)) return null;
    return parsed;
  } catch {
    return null;
  }
}

export async function writeCached<T>(cacheKey: string, value: T, scope?: string): Promise<void> {
  try {
    await AsyncStorage.setItem(
      cacheStorageKey(cacheKey, scope),
      JSON.stringify({ value, cachedAt: Date.now() } satisfies CachedValue<T>),
    );
    notifyOfflineStatus();
  } catch (error) {
    console.warn('[offline-cache] gagal menyimpan cache:', error);
  }
}

export async function updateCached<T>(
  cacheKey: string,
  scope: string | undefined,
  update: (value: T | null) => T,
): Promise<void> {
  const cached = await readCached<T>(cacheKey, scope);
  await writeCached(cacheKey, update(cached?.value ?? null), scope);
}

export async function hydrateQueryCache<TResponse, TQueryData>(
  queryClient: {
    setQueryData: (queryKey: readonly unknown[], data: TQueryData) => void;
    getQueryState: (queryKey: readonly unknown[]) => { dataUpdatedAt: number } | undefined;
  },
  queryKey: readonly unknown[],
  cacheKey: string,
  scope: string | undefined,
  select: (response: TResponse) => TQueryData,
): Promise<number | null> {
  const cached = await readCached<TResponse>(cacheKey, scope);
  if (!cached) return null;
  const currentUpdatedAt = queryClient.getQueryState(queryKey)?.dataUpdatedAt ?? 0;
  if (currentUpdatedAt > cached.cachedAt) return cached.cachedAt;
  queryClient.setQueryData(queryKey, select(cached.value));
  return cached.cachedAt;
}

export async function getQueuedMutationCount(scope?: string): Promise<number> {
  try {
    const stored = await AsyncStorage.getItem(QUEUE_KEY);
    const queue = stored ? (JSON.parse(stored) as OfflineMutation[]) : [];
    return queue.filter(item => !scope || item.scope === scope).length;
  } catch {
    return 0;
  }
}

export async function enqueueOfflineMutation(mutation: Omit<OfflineMutation, 'id' | 'createdAt'>): Promise<void> {
  return withQueueLock(async () => {
    try {
      const stored = await AsyncStorage.getItem(QUEUE_KEY);
      const queue = stored ? (JSON.parse(stored) as OfflineMutation[]) : [];
      queue.push({
        ...mutation,
        id: `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        createdAt: Date.now(),
      });
      await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(queue));
      notifyOfflineStatus();
    } catch (error) {
      console.warn('[offline-queue] gagal mengantrekan perubahan:', error);
      throw error;
    }
  });
}

export async function syncQueuedMutations(scope?: string): Promise<{ synced: number; resources: Set<OfflineMutation['resource']> }> {
  if (syncing) return { synced: 0, resources: new Set() };
  syncing = true;
  notifyOfflineStatus();

  try {
    return await withQueueLock(async () => {
      let synced = 0;
      const resources = new Set<OfflineMutation['resource']>();
      const stored = await AsyncStorage.getItem(QUEUE_KEY);
      const queue = stored ? (JSON.parse(stored) as OfflineMutation[]) : [];
      const remaining: OfflineMutation[] = [];
      if (!queue.some(item => !scope || item.scope === scope)) {
        return { synced, resources };
      }
      // Capture one token for the entire sync. A later account switch cannot
      // cause this batch to be submitted under the next user's credentials.
      const syncToken = await getAuthStorageItem(AUTH_TOKEN_KEY);
      if (!syncToken) return { synced, resources };
      if (scope) {
        try {
          const auth = await apiFetchWithToken<{ user?: { id: string } | null }>('/auth/user', undefined, syncToken);
          if (auth.user?.id !== scope) return { synced, resources };
        } catch {
          return { synced, resources };
        }
      }

      for (let index = 0; index < queue.length; index += 1) {
        const item = queue[index];
        if (scope && item.scope !== scope) {
          remaining.push(item);
          continue;
        }

        try {
          await apiFetchWithToken(item.path, { method: item.method, body: item.body }, syncToken);
          synced += 1;
          resources.add(item.resource);
        } catch (error) {
          remaining.push(item);
          if (isOfflineError(error)) {
            // Preserve all later entries and stop until connectivity returns.
            remaining.push(...queue.slice(index + 1));
            break;
          }
          // Server/auth failures remain queued so user-created data is never
          // silently discarded.
          console.warn('[offline-queue] perubahan belum dapat disinkronkan:', error);
        }
      }

      await AsyncStorage.setItem(QUEUE_KEY, JSON.stringify(remaining));
      if (synced > 0) notifyOfflineStatus();
      return { synced, resources };
    });
  } finally {
    syncing = false;
    notifyOfflineStatus();
  }
}

export async function probeConnection(): Promise<boolean> {
  try {
    await apiFetch<{ stats: DashboardStats }>('/v1/dashboard');
    return true;
  } catch {
    return false;
  }
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const token = await getAuthStorageItem(AUTH_TOKEN_KEY);
  return apiFetchWithToken<T>(path, options, token);
}

async function apiFetchWithToken<T>(path: string, options: RequestInit | undefined, token: string | null): Promise<T> {
  const base = getApiBase();
  const url = `${base}${path}`;
  const headers = new Headers(options?.headers);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  let res: Response;
  try {
    res = await fetch(url, {
      ...options,
      headers,
    });
  } catch (error) {
    setOnlineStatus(false);
    throw new OfflineError(`Tidak dapat terhubung ke server: ${url}`);
  }

  setOnlineStatus(true);
  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`);
  return res.json() as Promise<T>;
}

export async function cachedApiFetch<T>(
  cacheKey: string,
  path: string,
  scope?: string,
  options?: RequestInit,
): Promise<T> {
  const cached = await readCached<T>(cacheKey, scope);
  try {
    const result = await apiFetch<T>(path, options);
    if (!options?.method || options.method === 'GET') {
      await writeCached(cacheKey, result, scope);
    }
    return result;
  } catch (error) {
    if (cached && (!options?.method || options.method === 'GET')) return cached.value;
    throw error;
  }
}

// ─── typed response shapes ───────────────────────────────────────────────────

export interface DashboardStats {
  facilitators: number;
  articles: number;
  services: number;
  bookings: number;
  risks: number;
  vendors: number;
}

export interface Risk {
  id: number;
  name: string;
  description: string | null;
  category: string | null;
  probability: number;
  impact: number;
  riskLevel: string;
  owner: string | null;
  status: string;
  mitigation: string | null;
  createdAt: string;
  pendingSync?: boolean;
}

export interface Vendor {
  id: number;
  name: string;
  category: string | null;
  contactPerson: string | null;
  email: string | null;
  phone: string | null;
  status: string;
  createdAt: string;
  pendingSync?: boolean;
}

export interface AuditTask {
  id: number;
  code: string;
  title: string;
  agentType: string;
  status: string;
  priority: string;
  createdAt: string;
}

export interface KpiItem {
  id: number;
  name: string;
  target: number;
  actual: number;
  unit: string;
  status: string;
}

export interface ChatResponse {
  response: string;
  actions: string[];
  intent: string;
}
