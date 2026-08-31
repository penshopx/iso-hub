import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useColors } from '@/hooks/useColors';
import {
  getNotificationPreferences,
  NotificationPreferences,
  saveNotificationPreferences,
} from '@/lib/notification-preferences';

interface PreferenceRowProps {
  icon: keyof typeof Ionicons.glyphMap;
  iconColor: string;
  title: string;
  description: string;
  value: boolean;
  onValueChange: (value: boolean) => void;
  disabled: boolean;
  testID: string;
  isLast?: boolean;
  colors: ReturnType<typeof useColors>;
}

function PreferenceRow({
  icon,
  iconColor,
  title,
  description,
  value,
  onValueChange,
  disabled,
  testID,
  isLast = false,
  colors,
}: PreferenceRowProps) {
  return (
    <View style={[styles.row, { borderBottomColor: colors.border }, isLast && styles.lastRow]}>
      <View style={[styles.iconWrap, { backgroundColor: `${iconColor}22` }]}>
        <Ionicons name={icon} size={21} color={iconColor} />
      </View>
      <View style={styles.rowCopy}>
        <Text style={[styles.rowTitle, { color: colors.foreground }]}>{title}</Text>
        <Text style={[styles.rowDescription, { color: colors.mutedForeground }]}>
          {description}
        </Text>
      </View>
      <Switch
        testID={testID}
        accessibilityLabel={title}
        value={value}
        onValueChange={onValueChange}
        disabled={disabled}
        trackColor={{ false: colors.muted, true: `${colors.primary}88` }}
        thumbColor={value ? colors.primary : colors.mutedForeground}
        ios_backgroundColor={colors.muted}
      />
    </View>
  );
}

export default function SettingsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [preferences, setPreferences] = useState<NotificationPreferences | null>(null);
  const [saving, setSaving] = useState(false);
  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  useEffect(() => {
    let mounted = true;
    void getNotificationPreferences().then(value => {
      if (mounted) setPreferences(value);
    });
    return () => {
      mounted = false;
    };
  }, []);

  const updatePreference = async (key: keyof NotificationPreferences, value: boolean) => {
    if (!preferences || saving) return;

    const previous = preferences;
    const next = { ...preferences, [key]: value };
    setPreferences(next);
    setSaving(true);
    try {
      await saveNotificationPreferences(next);
    } catch {
      setPreferences(previous);
    } finally {
      setSaving(false);
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <ScrollView
        contentContainerStyle={{ paddingTop: topPad + 12, paddingBottom: bottomPad + 90 }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={[styles.headerIcon, { backgroundColor: `${colors.primary}22` }]}>
            <Ionicons name="notifications-outline" size={24} color={colors.primary} />
          </View>
          <View style={styles.headerCopy}>
            <Text style={[styles.headerTitle, { color: colors.foreground }]}>Pengaturan</Text>
            <Text style={[styles.headerDescription, { color: colors.mutedForeground }]}>
              Pilih peringatan kepatuhan yang ingin Anda terima.
            </Text>
          </View>
        </View>

        <View style={styles.sectionHeading}>
          <Text style={[styles.sectionTitle, { color: colors.foreground }]}>
            Pengaturan Notifikasi
          </Text>
          <Text style={[styles.sectionDescription, { color: colors.mutedForeground }]}>
            Preferensi ini tersimpan di perangkat Anda.
          </Text>
        </View>

        <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
          {preferences ? (
            <>
              <PreferenceRow
                icon="warning-outline"
                iconColor="#ef4444"
                title="Peringatan risiko kritis"
                description="Segera beri tahu saat risiko baru diklasifikasikan kritis."
                value={preferences.criticalRiskAlerts}
                onValueChange={value => void updatePreference('criticalRiskAlerts', value)}
                disabled={saving}
                testID="notification-critical-risk-switch"
                colors={colors}
              />
              <PreferenceRow
                icon="clipboard-outline"
                iconColor="#8b5cf6"
                title="Pengingat audit"
                description="Ingatkan saya tentang tugas audit yang masih menunggu."
                value={preferences.auditReminders}
                onValueChange={value => void updatePreference('auditReminders', value)}
                disabled={saving}
                testID="notification-audit-switch"
                colors={colors}
              />
              <PreferenceRow
                icon="bar-chart-outline"
                iconColor="#f59e0b"
                title="Peringatan KPI di bawah target"
                description="Beri tahu saat pencapaian KPI berada di bawah target."
                value={preferences.kpiWarnings}
                onValueChange={value => void updatePreference('kpiWarnings', value)}
                disabled={saving}
                testID="notification-kpi-switch"
                isLast
                colors={colors}
              />
            </>
          ) : (
            <View style={styles.loading}>
              <ActivityIndicator color={colors.primary} />
            </View>
          )}
        </View>

        <View style={[styles.note, { backgroundColor: `${colors.primary}12` }]}>
          <Ionicons name="information-circle-outline" size={18} color={colors.primary} />
          <Text style={[styles.noteText, { color: colors.mutedForeground }]}>
            Semua jenis notifikasi aktif secara default. Anda dapat mengubahnya kapan saja.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerCopy: { flex: 1 },
  headerTitle: { fontSize: 22, fontWeight: '700', fontFamily: 'Inter_700Bold' },
  headerDescription: {
    fontSize: 13,
    lineHeight: 19,
    marginTop: 3,
    fontFamily: 'Inter_400Regular',
  },
  sectionHeading: { paddingHorizontal: 20, marginTop: 30, marginBottom: 12 },
  sectionTitle: { fontSize: 16, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  sectionDescription: { fontSize: 12, marginTop: 4, fontFamily: 'Inter_400Regular' },
  card: {
    marginHorizontal: 16,
    borderRadius: 14,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  row: {
    minHeight: 86,
    paddingVertical: 14,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  lastRow: { borderBottomWidth: 0 },
  iconWrap: {
    width: 38,
    height: 38,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  rowCopy: { flex: 1, paddingRight: 10 },
  rowTitle: { fontSize: 14, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
  rowDescription: { fontSize: 11, lineHeight: 16, marginTop: 3, fontFamily: 'Inter_400Regular' },
  loading: { minHeight: 258, alignItems: 'center', justifyContent: 'center' },
  note: {
    marginHorizontal: 16,
    marginTop: 16,
    padding: 12,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  noteText: { flex: 1, fontSize: 12, lineHeight: 18, fontFamily: 'Inter_400Regular' },
});