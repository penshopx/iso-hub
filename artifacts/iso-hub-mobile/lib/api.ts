/**
 * API helper — constructs absolute URLs for the ISO Hub api-server.
 * Uses EXPO_PUBLIC_DOMAIN in native builds; falls back to a relative path on web.
 */
import { AUTH_TOKEN_KEY } from '@/lib/auth';
import { getAuthStorageItem } from '@/lib/auth-storage';

function getApiBase(): string {
  const domain = process.env.EXPO_PUBLIC_DOMAIN;
  if (domain) return `https://${domain}/api`;
  // Web preview — use relative URL
  return '/api';
}

export async function apiFetch<T>(path: string, options?: RequestInit): Promise<T> {
  const base = getApiBase();
  const url = `${base}${path}`;
  const token = await getAuthStorageItem(AUTH_TOKEN_KEY);
  const headers = new Headers(options?.headers);
  if (!headers.has('Content-Type')) headers.set('Content-Type', 'application/json');
  if (token) headers.set('Authorization', `Bearer ${token}`);

  const res = await fetch(url, {
    ...options,
    headers,
  });
  if (!res.ok) throw new Error(`API error ${res.status}: ${url}`);
  return res.json() as Promise<T>;
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
