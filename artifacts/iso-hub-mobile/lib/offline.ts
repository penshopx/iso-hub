import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch } from '@/lib/api';

export type OfflineCollection = 'risks' | 'vendors';

export interface PendingCreate {
  id: string;
  collection: OfflineCollection;
  endpoint: string;
  payload: Record<string, unknown>;
  optimistic: Record<string, unknown>;
  createdAt: string;
}

export interface SyncResult {
  synced: number;
  pending: number;
  networkError: boolean;
}

const CACHE_PREFIX = '@iso-hub/cache';
const QUEUE_PREFIX = '@iso-hub/queue';

function cacheKey(userId: string, collection: OfflineCollection): string {
  return `${CACHE_PREFIX}/${userId}/${collection}`;
}

function queueKey(userId: string): string {
  return `${QUEUE_PREFIX}/${userId}`;
}

async function readQueue(userId: string): Promise<PendingCreate[]> {
  const raw = await AsyncStorage.getItem(queueKey(userId));
  if (!raw) return [];

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as PendingCreate[]) : [];
  } catch {
    return [];
  }
}

async function writeQueue(userId: string, queue: PendingCreate[]): Promise<void> {
  await AsyncStorage.setItem(queueKey(userId), JSON.stringify(queue));
}

export async function readCachedCollection<T>(
  userId: string,
  collection: OfflineCollection,
): Promise<T[] | null> {
  const raw = await AsyncStorage.getItem(cacheKey(userId, collection));
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? (parsed as T[]) : null;
  } catch {
    return null;
  }
}

async function writeCachedCollection<T extends { id: number }>(
  userId: string,
  collection: OfflineCollection,
  items: T[],
): Promise<void> {
  await AsyncStorage.setItem(cacheKey(userId, collection), JSON.stringify(items));
}

function mergePending<T extends { id: number }>(
  items: T[],
  queue: PendingCreate[],
  collection: OfflineCollection,
): T[] {
  const pending = queue
    .filter(item => item.collection === collection)
    .map(item => item.optimistic as T);

  const pendingIds = new Set(pending.map(item => item.id));
  return [...pending, ...items.filter(item => !pendingIds.has(item.id))];
}

function isNetworkError(error: unknown): boolean {
  if (error instanceof TypeError) return true;
  if (!(error instanceof Error)) return false;

  const message = error.message.toLowerCase();
  return (
    message.includes('network request failed') ||
    message.includes('failed to fetch') ||
    message.includes('networkerror') ||
    message.includes('load failed') ||
    message.includes('timed out')
  );
}

export async function fetchCollection<T extends { id: number }>(params: {
  userId: string;
  collection: OfflineCollection;
  endpoint: string;
  onNetworkError?: () => void;
  onNetworkSuccess?: () => void;
}): Promise<T[]> {
  const { userId, collection, endpoint, onNetworkError, onNetworkSuccess } = params;
  const queue = await readQueue(userId);

  try {
    const response = await apiFetch<{ data: T[] }>(endpoint);
    onNetworkSuccess?.();
    await writeCachedCollection(userId, collection, response.data);
    return mergePending(response.data, queue, collection);
  } catch (error) {
    if (!isNetworkError(error)) throw error;
    onNetworkError?.();

    const cached = await readCachedCollection<T>(userId, collection);
    if (cached === null) throw error;
    return mergePending(cached, queue, collection);
  }
}

export function makeTemporaryId(): number {
  return -(Date.now() * 1000 + Math.floor(Math.random() * 1000));
}

export async function createWithOfflineQueue<T extends { id: number }>(params: {
  userId: string;
  collection: OfflineCollection;
  endpoint: string;
  payload: Record<string, unknown>;
  optimistic: T;
}): Promise<{ queued: boolean; data: T }> {
  const { userId, collection, endpoint, payload, optimistic } = params;

  try {
    const response = await apiFetch<{ success: boolean; data?: T }>(endpoint, {
      method: 'POST',
      body: JSON.stringify(payload),
    });

    return { queued: false, data: response.data ?? optimistic };
  } catch (error) {
    if (!isNetworkError(error)) throw error;

    const queue = await readQueue(userId);
    queue.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      collection,
      endpoint,
      payload,
      optimistic: { ...optimistic, pendingSync: true },
      createdAt: new Date().toISOString(),
    });
    await writeQueue(userId, queue);

    const cached = (await readCachedCollection<T>(userId, collection)) ?? [];
    await writeCachedCollection(userId, collection, [
      { ...optimistic, pendingSync: true },
      ...cached.filter(item => item.id !== optimistic.id),
    ]);

    return { queued: true, data: { ...optimistic, pendingSync: true } };
  }
}

export async function getPendingCount(userId: string): Promise<number> {
  return (await readQueue(userId)).length;
}

export async function syncPendingCreates(userId: string): Promise<SyncResult> {
  const queue = await readQueue(userId);
  if (queue.length === 0) return { synced: 0, pending: 0, networkError: false };

  const remaining: PendingCreate[] = [];
  const completedIds = new Set<string>();
  let synced = 0;
  let networkError = false;

  for (const item of queue) {
    try {
      const response = await apiFetch<{ success: boolean; data?: { id: number } }>(
        item.endpoint,
        { method: 'POST', body: JSON.stringify(item.payload) },
      );
      const cached = (await readCachedCollection<Record<string, unknown>>(
        userId,
        item.collection,
      )) ?? [];
      const withoutOptimistic = cached.filter(
        cachedItem => cachedItem.id !== item.optimistic.id,
      );
      const next = response.data
        ? [response.data as Record<string, unknown>, ...withoutOptimistic]
        : withoutOptimistic;
      await writeCachedCollection(userId, item.collection, next as { id: number }[]);
      synced += 1;
      completedIds.add(item.id);
    } catch (error) {
      remaining.push(item);
      if (isNetworkError(error)) {
        networkError = true;
        break;
      }
    }
  }

  const finalQueue = networkError
    ? [
        ...remaining,
        ...queue.filter(
          item =>
            !completedIds.has(item.id) &&
            !remaining.some(rest => rest.id === item.id),
        ),
      ]
    : remaining;

  await writeQueue(userId, finalQueue);
  return { synced, pending: finalQueue.length, networkError };
}