import React from 'react';
import {
  ActivityIndicator,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useAuth } from '@/lib/auth';
import { useColors } from '@/hooks/useColors';

export default function LoginScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const { isLoading, login } = useAuth();
  const topPadding = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPadding = Platform.OS === 'web' ? 34 : insets.bottom;
  const s = styles(colors);

  return (
    <View
      style={[
        s.container,
        {
          backgroundColor: colors.background,
          paddingTop: topPadding,
          paddingBottom: bottomPadding,
        },
      ]}
    >
      <View style={s.brand}>
        <View style={[s.logo, { backgroundColor: colors.primary }]}>
          <Ionicons name="shield-checkmark" size={38} color={colors.primaryForeground} />
        </View>
        <Text style={[s.title, { color: colors.foreground }]}>ISO Hub</Text>
        <Text style={[s.subtitle, { color: colors.mutedForeground }]}>
          Kelola risiko dan vendor organisasi Anda dengan aman dalam satu akun.
        </Text>
      </View>

      <View style={[s.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
        <View style={[s.securityIcon, { backgroundColor: `${colors.primary}1A` }]}>
          <Ionicons name="lock-closed-outline" size={24} color={colors.primary} />
        </View>
        <Text style={[s.cardTitle, { color: colors.foreground }]}>
          Masuk untuk melanjutkan
        </Text>
        <Text style={[s.cardText, { color: colors.mutedForeground }]}>
          Data risiko dan vendor hanya dapat dilihat oleh akun Anda.
        </Text>
        <TouchableOpacity
          testID="login-button"
          accessibilityRole="button"
          accessibilityLabel="Masuk ke ISO Hub"
          activeOpacity={0.82}
          disabled={isLoading}
          onPress={login}
          style={[
            s.loginButton,
            { backgroundColor: colors.primary, opacity: isLoading ? 0.65 : 1 },
          ]}
        >
          {isLoading ? (
            <ActivityIndicator color={colors.primaryForeground} />
          ) : (
            <>
              <Ionicons name="log-in-outline" size={20} color={colors.primaryForeground} />
              <Text style={[s.loginText, { color: colors.primaryForeground }]}>Masuk</Text>
            </>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'space-between',
      paddingHorizontal: 24,
      paddingVertical: 40,
    },
    brand: {
      alignItems: 'center',
      paddingTop: 42,
    },
    logo: {
      width: 76,
      height: 76,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 22,
    },
    title: {
      fontFamily: 'Inter_700Bold',
      fontSize: 34,
      marginBottom: 10,
    },
    subtitle: {
      fontFamily: 'Inter_400Regular',
      fontSize: 15,
      lineHeight: 23,
      maxWidth: 310,
      textAlign: 'center',
    },
    card: {
      borderWidth: 1,
      borderRadius: colors.radius * 2,
      padding: 22,
      alignItems: 'center',
    },
    securityIcon: {
      width: 48,
      height: 48,
      borderRadius: 24,
      alignItems: 'center',
      justifyContent: 'center',
      marginBottom: 14,
    },
    cardTitle: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 18,
      marginBottom: 8,
    },
    cardText: {
      fontFamily: 'Inter_400Regular',
      fontSize: 13,
      lineHeight: 19,
      textAlign: 'center',
      marginBottom: 20,
    },
    loginButton: {
      width: '100%',
      minHeight: 52,
      borderRadius: colors.radius + 4,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 9,
    },
    loginText: {
      fontFamily: 'Inter_600SemiBold',
      fontSize: 16,
    },
  });