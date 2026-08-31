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
import Constants from 'expo-constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { apiFetch, AuditTask, KpiItem, Risk } from '@/lib/api';
import {
  AUDIT_NOTIFICATION_ID,
  REGISTERED_PUSH_TOKEN_KEY,
} from '@/lib/notification-storage';
import {
  getNotificationPreferences,
  NotificationPreferences,
  subscribeToNotificationPreferences,
} from '@/lib/notification-preferences';

const PERMISSION_ASKED_KEY = 'notifications_permission_asked';
const CRITICAL_ALERTED_KEY = 'notifications_critical_alerted_ids';
const KPI_ALERTED_KEY = 'notifications_kpi_alerted_ids';
const DEVICE_ID_KEY = 'notifications_device_id';

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

async function getNotificationDeviceId(): Promise<string> {
  const stored = await AsyncStorage.getItem(DEVICE_ID_KEY);
  if (stored) return stored;

  const generated = `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 12)}`;
  await AsyncStorage.setItem(DEVICE_ID_KEY, generated);
  return generated;
}

async function registerForRemotePushNotifications(
  preferences: NotificationPreferences,
): Promise<void> {
  if (Platform.OS === 'web') return;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('compliance-alerts', {
      name: 'Compliance alerts',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      sound: 'default',
    });
  }

  const projectId = Constants.expoConfig?.extra?.eas?.projectId ?? Constants.easConfig?.projectId;
  const tokenResponse = await Notifications.getExpoPushTokenAsync(
    projectId ? { projectId } : undefined,
  );
  await apiFetch<{ success: boolean }>('/v1/notifications/push-token', {
    method: 'POST',
    body: JSON.stringify({
      token: tokenResponse.data,
      platform: Platform.OS,
      deviceId: await getNotificationDeviceId(),
      preferences,
    }),
  });
  await AsyncStorage.setItem(REGISTERED_PUSH_TOKEN_KEY, tokenResponse.data);
}

async function updateRemoteNotificationPreferences(
  preferences: NotificationPreferences,
): Promise<void> {
  if (Platform.OS === 'web') return;
  const token = await AsyncStorage.getItem(REGISTERED_PUSH_TOKEN_KEY);
  if (!token) return;

  await apiFetch<{ success: boolean }>('/v1/notifications/push-token/preferences', {
    method: 'PATCH',
    body: JSON.stringify({ token, preferences }),
  });
}

async function scheduleAuditReminder(tasks: AuditTask[], enabled: boolean): Promise<void> {
  if (Platform.OS === 'web') return;

  // Cancel any existing reminder first
  await Notifications.cancelScheduledNotificationAsync(AUDIT_NOTIFICATION_ID).catch(() => {});

  if (!enabled) return;

  const pending = tasks.filter(t => t.status === 'pending');
  if (pending.length === 0) return;

  const body =
    pending.length === 1
      ? `Tugas audit menunggu: ${pending[0].title}`
      : `${pending.length} tugas audit menunggu penyelesaian`;

  await Notifications.scheduleNotificationAsync({
    identifier: AUDIT_NOTIFICATION_ID,
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

async function alertCriticalRisks(risks: Risk[], enabled: boolean): Promise<void> {
  if (Platform.OS === 'web') return;
  if (!enabled) return;

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

async function alertBelowTargetKpis(kpis: KpiItem[], enabled: boolean): Promise<void> {
  if (Platform.OS === 'web' || !enabled) return;

  const belowTarget = kpis.filter(kpi => kpi.actual < kpi.target);
  if (belowTarget.length === 0) return;

  const stored = await AsyncStorage.getItem(KPI_ALERTED_KEY);
  const alertedIds: number[] = stored ? (JSON.parse(stored) as number[]) : [];
  const newBelowTarget = belowTarget.filter(kpi => !alertedIds.includes(kpi.id));
  if (newBelowTarget.length === 0) return;

  for (const kpi of newBelowTarget) {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: '⚠️ KPI Di Bawah Target',
        body: `"${kpi.name}" berada di bawah target (${kpi.actual}${kpi.unit} dari ${kpi.target}${kpi.unit}).`,
        data: { type: 'kpi_below_target', kpiId: kpi.id },
      },
      trigger: null,
    });
  }

  const updatedIds = [...alertedIds, ...newBelowTarget.map(kpi => kpi.id)];
  await AsyncStorage.setItem(KPI_ALERTED_KEY, JSON.stringify(updatedIds));
}

export function useNotifications(userId?: string): void {
  const initializedForUser = useRef<string | null>(null);

  useEffect(() => {
    if (!userId) {
      initializedForUser.current = null;
      return;
    }
    if (initializedForUser.current === userId) return;
    initializedForUser.current = userId;
    let active = true;
    let notificationsGranted = false;
    let syncQueue = Promise.resolve();

    const syncNotifications = async (preferences: NotificationPreferences) => {
      if (!active || !notificationsGranted) return;

      const [auditRes, risksRes, kpiRes] = await Promise.all([
        apiFetch<{ data: AuditTask[] }>('/v1/audit').catch(() => ({ data: [] as AuditTask[] })),
        apiFetch<{ data: Risk[]; total: number }>('/v1/risks').catch(() => ({
          data: [] as Risk[],
          total: 0,
        })),
        apiFetch<{ data: KpiItem[] }>('/v1/kpi').catch(() => ({ data: [] as KpiItem[] })),
      ]);

      await Promise.all([
        scheduleAuditReminder(auditRes.data, preferences.auditReminders),
        alertCriticalRisks(risksRes.data, preferences.criticalRiskAlerts),
        alertBelowTargetKpis(kpiRes.data, preferences.kpiWarnings),
      ]);
    };

    const queueNotificationSync = (syncRemote: boolean): Promise<void> => {
      syncQueue = syncQueue.then(async () => {
        if (!active || !notificationsGranted) return;
        const preferences = await getNotificationPreferences();
        if (syncRemote) {
          await updateRemoteNotificationPreferences(preferences).catch(error => {
            console.warn('[useNotifications] remote preference sync error:', error);
          });
        }
        await syncNotifications(preferences);
      });
      return syncQueue;
    };

    const unsubscribe = subscribeToNotificationPreferences(() => {
      // The value is persisted before listeners are notified. Read it again
      // in the queue so rapid toggle changes cannot apply an older preference.
      void queueNotificationSync(true).catch(error => {
        console.warn('[useNotifications] preference sync error:', error);
      });
    });

    (async () => {
      try {
        const granted = await requestPermissionWithExplanation();
        if (!granted) return;
        notificationsGranted = true;
        const preferences = await getNotificationPreferences();

        // Register the device token so the server can notify this user while
        // the app is backgrounded or closed.
        await registerForRemotePushNotifications(preferences).catch(error => {
          console.warn('[useNotifications] remote push registration error:', error);
        });

        await queueNotificationSync(false);
      } catch (e) {
        // Notifications are non-critical — never crash the app
        console.warn('[useNotifications] setup error:', e);
      }
    })();

    return () => {
      active = false;
      unsubscribe();
    };
  }, [userId]);
}
