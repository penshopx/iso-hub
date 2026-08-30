import { useEffect, useState } from 'react';
import { AppState } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import {
  getOnlineStatus,
  getQueuedMutationCount,
  getSyncingStatus,
  readCached,
  probeConnection,
  subscribeOfflineStatus,
  syncQueuedMutations,
} from '@/lib/api';

export interface OfflineSnapshot {
  online: boolean;
  syncing: boolean;
  queued: number;
  cachedAt: number | null;
}

export function useOfflineStatus(cacheKey: string, scope?: string): OfflineSnapshot {
  const [snapshot, setSnapshot] = useState<OfflineSnapshot>({
    online: getOnlineStatus(),
    syncing: getSyncingStatus(),
    queued: 0,
    cachedAt: null,
  });

  useEffect(() => {
    let active = true;
    const refresh = async () => {
      const [queued, cache] = await Promise.all([
        getQueuedMutationCount(scope),
        readCached(cacheKey, scope),
      ]);
      if (!active) return;
      setSnapshot({
        online: getOnlineStatus(),
        syncing: getSyncingStatus(),
        queued,
        cachedAt: cache?.cachedAt ?? null,
      });
    };

    void refresh();
    const unsubscribe = subscribeOfflineStatus(() => { void refresh(); });
    const timer = setInterval(() => { void refresh(); }, 30_000);
    return () => {
      active = false;
      unsubscribe();
      clearInterval(timer);
    };
  }, [cacheKey, scope]);

  return snapshot;
}

export function useOfflineSync(scope?: string): void {
  const queryClient = useQueryClient();

  useEffect(() => {
    let active = true;
    const sync = async () => {
      if (!scope || !active) return;
      if (!(await probeConnection()) || !active) return;
      const result = await syncQueuedMutations(scope);
      if (result.synced === 0 || !active) return;

      for (const resource of result.resources) {
        await queryClient.invalidateQueries({ queryKey: [resource, scope] });
      }
      await queryClient.invalidateQueries({ queryKey: ['dashboard', scope] });
    };

    void sync();
    const appStateSubscription = AppState.addEventListener('change', state => {
      if (state === 'active') void sync();
    });
    const timer = setInterval(() => { void sync(); }, 30_000);

    return () => {
      active = false;
      appStateSubscription.remove();
      clearInterval(timer);
    };
  }, [queryClient, scope]);
}