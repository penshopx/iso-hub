import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications';
import { Platform } from 'react-native';

export const REGISTERED_PUSH_TOKEN_KEY = 'notifications_registered_push_token';
export const AUDIT_NOTIFICATION_ID = 'audit-daily-reminder';

export async function clearRegisteredNotifications(): Promise<void> {
  if (Platform.OS !== 'web') {
    await Notifications.cancelScheduledNotificationAsync(AUDIT_NOTIFICATION_ID).catch(() => {});
  }
  await AsyncStorage.removeItem(REGISTERED_PUSH_TOKEN_KEY);
}