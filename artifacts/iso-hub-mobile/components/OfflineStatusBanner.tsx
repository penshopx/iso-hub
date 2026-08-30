import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useColors } from '@/hooks/useColors';
import { useOfflineStatus } from '@/lib/offline-context';

export function OfflineStatusBanner() {
  const colors = useColors();
  const { isOnline, isSyncing, pendingCount, syncNow } = useOfflineStatus();

  if (isOnline && pendingCount === 0) return null;

  const message = isOnline
    ? `${pendingCount} perubahan menunggu sinkronisasi`
    : pendingCount > 0
      ? `Offline · ${pendingCount} perubahan tersimpan di perangkat`
      : 'Offline · menampilkan data terakhir yang tersimpan';

  return (
    <View
      testID="offline-status-banner"
      style={[
        styles.container,
        {
          backgroundColor: isOnline ? colors.primary + '18' : colors.muted,
          borderColor: isOnline ? colors.primary + '44' : colors.border,
        },
      ]}
    >
      {isSyncing ? (
        <ActivityIndicator size="small" color={colors.primary} />
      ) : (
        <Ionicons
          name={isOnline ? 'cloud-upload-outline' : 'cloud-offline-outline'}
          size={17}
          color={isOnline ? colors.primary : colors.mutedForeground}
        />
      )}
      <Text
        style={[
          styles.message,
          { color: isOnline ? colors.primary : colors.mutedForeground },
        ]}
      >
        {message}
      </Text>
      <TouchableOpacity
        testID="sync-now-button"
        accessibilityRole="button"
        accessibilityLabel="Sinkronkan data sekarang"
        disabled={isSyncing}
        onPress={() => void syncNow()}
      >
        <Text style={[styles.action, { color: colors.primary }]}>
          {isSyncing ? 'Menyinkronkan' : 'Coba lagi'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  message: {
    flex: 1,
    fontSize: 12,
    fontFamily: 'Inter_500Medium',
  },
  action: {
    fontSize: 12,
    fontFamily: 'Inter_600SemiBold',
  },
});