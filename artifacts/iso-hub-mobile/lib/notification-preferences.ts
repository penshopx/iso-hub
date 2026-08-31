import AsyncStorage from '@react-native-async-storage/async-storage';

export const NOTIFICATION_PREFERENCES_KEY = 'notifications_preferences';

export interface NotificationPreferences {
  criticalRiskAlerts: boolean;
  auditReminders: boolean;
  kpiWarnings: boolean;
}

export const DEFAULT_NOTIFICATION_PREFERENCES: NotificationPreferences = {
  criticalRiskAlerts: true,
  auditReminders: true,
  kpiWarnings: true,
};

type PreferencesListener = (preferences: NotificationPreferences) => void;
const listeners = new Set<PreferencesListener>();

function normalizePreferences(value: unknown): NotificationPreferences {
  if (!value || typeof value !== 'object') return { ...DEFAULT_NOTIFICATION_PREFERENCES };

  const stored = value as Partial<NotificationPreferences>;
  return {
    criticalRiskAlerts:
      typeof stored.criticalRiskAlerts === 'boolean'
        ? stored.criticalRiskAlerts
        : DEFAULT_NOTIFICATION_PREFERENCES.criticalRiskAlerts,
    auditReminders:
      typeof stored.auditReminders === 'boolean'
        ? stored.auditReminders
        : DEFAULT_NOTIFICATION_PREFERENCES.auditReminders,
    kpiWarnings:
      typeof stored.kpiWarnings === 'boolean'
        ? stored.kpiWarnings
        : DEFAULT_NOTIFICATION_PREFERENCES.kpiWarnings,
  };
}

export async function getNotificationPreferences(): Promise<NotificationPreferences> {
  const stored = await AsyncStorage.getItem(NOTIFICATION_PREFERENCES_KEY);
  if (!stored) return { ...DEFAULT_NOTIFICATION_PREFERENCES };

  try {
    return normalizePreferences(JSON.parse(stored));
  } catch {
    return { ...DEFAULT_NOTIFICATION_PREFERENCES };
  }
}

export async function saveNotificationPreferences(
  preferences: NotificationPreferences,
): Promise<void> {
  const normalized = normalizePreferences(preferences);
  await AsyncStorage.setItem(NOTIFICATION_PREFERENCES_KEY, JSON.stringify(normalized));
  listeners.forEach(listener => listener(normalized));
}

export function subscribeToNotificationPreferences(
  listener: PreferencesListener,
): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}