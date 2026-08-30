/**
 * useNotifications — manages Expo local notifications for ISO Hub.
 *
 * Responsibilities:
 *  - Request permission on first launch with a user-friendly explanation
 *  - Schedule a recurring audit reminder if there are pending audit tasks
 *  - Fire an immediate alert when any risk is at "critical" level
 *
 * Web: expo-notifications has partial web support — we guard all calls with
 *      Platform.OS !== 'web'.
 */

import { useEffect, useRef } from 'react';
import { Alert, Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch, AuditTask, Risk } from '@/lib/api';

const PERMISSION_ASKED_KEY = 'notifications_permission_asked';
const CRITICAL_ALERTED_KEY = 'notifications_critical_alerted_ids';
const AUDIT_NOTIF_ID = 'audit-daily-reminder';

// Configure how notifications appear while the app is in the foreground
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

function showExplanationAlert(): Promise<void> {
  return new Promise<void>(resolve => {
    Alert.alert(
      'Aktifkan Notifikasi',
      'ISO Hub akan mengirim pengingat audit dan peringatan risiko kritis agar Anda selalu tahu status kepatuhan terkini.',
      [
        { text: 'Nanti Saja', style: 'cancel', onPress: () => resolve() },
        { text: 'Aktifkan', onPress: () => resolve() },
      ],
    );
  });
}

async function requestPermissionWithExplanation(): Promise<boolean> {
  if (Platform.OS === 'web') return false;

  const alreadyAsked = await AsyncStorage.getItem(PERMISSION_ASKED_KEY);

  if (alreadyAsked === 'true') {
    // Already asked — check current status
    const perm = (await Notifications.getPermissionsAsync()) as unknown as { granted: boolean };
    return perm.granted;
  }

  // First launch: show explanation before the system prompt
  await showExplanationAlert();
  await AsyncStorage.setItem(PERMISSION_ASKED_KEY, 'true');

  const perm = (await Notifications.requestPermissionsAsync()) as unknown as { granted: boolean };
  return perm.granted;
}

async function scheduleAuditReminder(tasks: AuditTask[]): Promise<void> {
  if (Platform.OS === 'web') return;

  const pending = tasks.filter(t => t.status === 'pending');

  // Cancel any existing reminder first
  await Notifications.cancelScheduledNotificationAsync(AUDIT_NOTIF_ID).catch(() => {});

  if (pending.length === 0) return;

  const body =
    pending.length === 1
      ? `Tugas audit menunggu: ${pending[0].title}`
      : `${pending.length} tugas audit menunggu penyelesaian`;

  await Notifications.scheduleNotificationAsync({
    identifier: AUDIT_NOTIF_ID,
    content: {
      title: '📋 Pengingat Audit ISO',
      body,
      data: { type: 'audit_reminder' },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: 60 * 60 * 8, // repeat every 8 hours
      repeats: true,
    },
  });
}

async function alertCriticalRisks(risks: Risk[]): Promise<void> {
  if (Platform.OS === 'web') return;

  const critical = risks.filter(r => r.riskLevel === 'critical');
  if (critical.length === 0) return;

  // Track IDs we've already alerted about so we don't spam
  const stored = await AsyncStorage.getItem(CRITICAL_ALERTED_KEY);
  const alertedIds: number[] = stored ? (JSON.parse(stored) as number[]) : [];

  const newCritical = critical.filter(r => !alertedIds.includes(r.id));
  if (newCritical.length === 0) return;

  for (const risk of newCritical) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '🚨 Risiko Kritis Terdeteksi',
        body: `"${risk.name}" diklasifikasikan sebagai risiko KRITIS. Tindakan segera diperlukan.`,
        data: { type: 'critical_risk', riskId: risk.id },
      },
      trigger: null, // fire immediately
    });
  }

  const updatedIds = [...alertedIds, ...newCritical.map(r => r.id)];
  await AsyncStorage.setItem(CRITICAL_ALERTED_KEY, JSON.stringify(updatedIds));
}

export function useNotifications(): void {
  const initialized = useRef(false);

  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    (async () => {
      try {
        const granted = await requestPermissionWithExplanation();
        if (!granted) return;

        // Fetch audit tasks and risks concurrently, then set up notifications
        const [auditRes, risksRes] = await Promise.all([
          apiFetch<{ data: AuditTask[] }>('/v1/audit').catch(() => ({ data: [] as AuditTask[] })),
          apiFetch<{ data: Risk[]; total: number }>('/v1/risks').catch(() => ({
            data: [] as Risk[],
            total: 0,
          })),
        ]);

        await Promise.all([
          scheduleAuditReminder(auditRes.data),
          alertCriticalRisks(risksRes.data),
        ]);
      } catch (e) {
        // Notifications are non-critical — never crash the app
        console.warn('[useNotifications] setup error:', e);
      }
    })();
  }, []);
}
