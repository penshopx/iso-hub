import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useOfflineStatus } from '@/hooks/useOfflineStatus';

interface OfflineBannerProps {
  cacheKey: string;
  scope?: string;
  isRefreshing?: boolean;
}

function formatAge(timestamp: number): string {
  const minutes = Math.max(1, Math.floor((Date.now() - timestamp) / 60_000));
  if (minutes < 60) return `${minutes} menit lalu`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} jam lalu`;
  return `${Math.floor(hours / 24)} hari lalu`;
}

export function OfflineBanner({ cacheKey, scope, isRefreshing = false }: OfflineBannerProps) {
  const colors = useColors();
  const { online, syncing, queued, cachedAt } = useOfflineStatus(cacheKey, scope);
  const isStale = cachedAt !== null && Date.now() - cachedAt > 5 * 60_000;

  if (!isRefreshing && online && !syncing && queued === 0 && !isStale) return null;

  const icon = !online ? 'cloud-offline-outline' : syncing ? 'sync-outline' : isRefreshing ? 'refresh-outline' : 'time-outline';
  const message = !online
    ? cachedAt ? 'Offline · Menampilkan data terakhir' : 'Offline · Menunggu koneksi'
    : syncing
      ? 'Menyinkronkan perubahan...'
      : queued > 0
        ? `${queued} perubahan menunggu sinkronisasi`
        : isRefreshing
          ? 'Memperbarui data...'
          : `Data mungkin usang · terakhir diperbarui ${formatAge(cachedAt as number)}`;

  return (
    <View
      accessibilityRole="alert"
      style={[
        styles.banner,
        {
          backgroundColor: !online ? colors.destructive + '18' : colors.primary + '18',
          borderColor: !online ? colors.destructive + '45' : colors.primary + '45',
        },
      ]}
    >
      <Ionicons name={icon} size={16} color={!online ? colors.destructive : colors.primary} />
      <Text style={[styles.text, { color: !online ? colors.destructive : colors.primary }]}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  banner: {
    marginHorizontal: 16,
    marginBottom: 4,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  text: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
});