import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';
import { AppState, Platform } from 'react-native';
import { useQueryClient } from '@tanstack/react-query';
import { getPendingCount, syncPendingCreates } from '@/lib/offline';

interface OfflineContextValue {
  isOnline: boolean;
  isSyncing: boolean;
  pendingCount: number;
  markOnline: () => void;
  markOffline: () => void;
  markQueued: () => void;
  syncNow: () => Promise<void>;
}

const OfflineContext = createContext<OfflineContextValue | null>(null);

export function OfflineProvider({ userId, children }: { userId: string | null; children: ReactNode }) {
  const queryClient = useQueryClient();
  const [isOnline, setIsOnline] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const syncingRef = useRef(false);

  const refreshPendingCount = useCallback(async () => {
    if (!userId) {
      setPendingCount(0);
      return;
    }
    setPendingCount(await getPendingCount(userId));
  }, [userId]);

  const syncNow = useCallback(async () => {
    if (!userId || syncingRef.current) return;
    syncingRef.current = true;
    setIsSyncing(true);
    try {
      const result = await syncPendingCreates(userId);
      setPendingCount(result.pending);
      setIsOnline(!result.networkError);

      if (result.synced > 0) {
        await queryClient.invalidateQueries({ queryKey: ['risks', userId] });
        await queryClient.invalidateQueries({ queryKey: ['vendors', userId] });
        await queryClient.invalidateQueries({ queryKey: ['dashboard'] });
      }
    } finally {
      syncingRef.current = false;
      setIsSyncing(false);
    }
  }, [queryClient, userId]);

  useEffect(() => {
    void refreshPendingCount();
    void syncNow();

    const appStateSubscription = AppState.addEventListener('change', state => {
      if (state === 'active') void syncNow();
    });

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      const handleOnline = () => {
        setIsOnline(true);
        void syncNow();
      };
      const handleOffline = () => setIsOnline(false);
      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        appStateSubscription.remove();
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }

    return () => appStateSubscription.remove();
  }, [refreshPendingCount, syncNow]);

  const value = useMemo<OfflineContextValue>(
    () => ({
      isOnline,
      isSyncing,
      pendingCount,
      markOnline: () => setIsOnline(true),
      markOffline: () => setIsOnline(false),
      markQueued: () => {
        setIsOnline(false);
        setPendingCount(count => count + 1);
      },
      syncNow,
    }),
    [isOnline, isSyncing, pendingCount, syncNow],
  );

  return <OfflineContext.Provider value={value}>{children}</OfflineContext.Provider>;
}

export function useOfflineStatus(): OfflineContextValue {
  const context = useContext(OfflineContext);
  if (!context) throw new Error('useOfflineStatus must be used within OfflineProvider');
  return context;
}