import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Platform,
  Alert,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useColors } from '@/hooks/useColors';
import { apiFetch, DashboardStats } from '@/lib/api';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useAuth } from '@/lib/auth';

interface MenuItem {
  title: string;
  description: string;
  color: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

const menuItems: MenuItem[] = [
  { title: 'Risiko', description: 'Manajemen Risiko', color: '#ef4444', icon: 'warning-outline', route: '/risks' },
  { title: 'Vendor', description: 'Vendor & Supplier', color: '#10b981', icon: 'business-outline', route: '/vendors' },
  { title: 'Audit', description: 'Audit & KPI', color: '#8b5cf6', icon: 'clipboard-outline', route: '/audit' },
  { title: 'AI Chat', description: 'ISO Assistant', color: '#3b82f6', icon: 'chatbubbles-outline', route: '/chat' },
];

const isoStandards = [
  { label: 'ISO 9001', sub: 'Mutu', color: '#3b82f6' },
  { label: 'ISO 14001', sub: 'Lingkungan', color: '#10b981' },
  { label: 'ISO 45001', sub: 'K3', color: '#f59e0b' },
  { label: 'ISO 27001', sub: 'Keamanan', color: '#8b5cf6' },
  { label: 'ISO 31000', sub: 'Risiko', color: '#ef4444' },
  { label: 'ISO 22000', sub: 'Pangan', color: '#06b6d4' },
];

export default function DashboardScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const { user, logout } = useAuth();

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['dashboard'],
    queryFn: () => apiFetch<{ stats: DashboardStats }>('/v1/dashboard').then(r => r.stats),
  });

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const s = styles(colors);

  const stats = [
    { label: 'Risiko', value: data?.risks ?? 0, color: '#ef4444' },
    { label: 'Vendor', value: data?.vendors ?? 0, color: '#10b981' },
    { label: 'Artikel', value: data?.articles ?? 0, color: '#3b82f6' },
    { label: 'Booking', value: data?.bookings ?? 0, color: '#8b5cf6' },
  ];

  return (
    <ScrollView
      style={[s.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingTop: topPad + 12, paddingBottom: bottomPad + 90 }}
      refreshControl={
        <RefreshControl refreshing={isRefetching} onRefresh={refetch} tintColor={colors.primary} />
      }
      showsVerticalScrollIndicator={false}
    >
      {/* Header */}
      <View style={s.header}>
        <View style={s.logoRow}>
          <View style={[s.logoIcon, { backgroundColor: colors.primary }]}>
            <Ionicons name="shield-checkmark" size={20} color="#fff" />
          </View>
          <View>
            <Text style={[s.logoTitle, { color: colors.foreground }]}>ISO Hub</Text>
            <Text style={[s.logoSub, { color: colors.mutedForeground }]}>Platform ISO Indonesia</Text>
          </View>
        </View>
        <TouchableOpacity
          testID="logout-button"
          accessibilityRole="button"
          accessibilityLabel="Keluar dari akun"
          onPress={() => {
            Alert.alert('Keluar dari akun?', 'Anda perlu masuk kembali untuk membuka data organisasi.', [
              { text: 'Batal', style: 'cancel' },
              { text: 'Keluar', style: 'destructive', onPress: logout },
            ]);
          }}
        >
          <Ionicons name="log-out-outline" size={22} color={colors.mutedForeground} />
        </TouchableOpacity>
      </View>

      {/* Welcome */}
      <View style={s.welcomeBlock}>
        <Text style={[s.welcomeTitle, { color: colors.foreground }]}>
          Selamat Datang{user?.firstName ? `, ${user.firstName}` : ''}
        </Text>
        <Text style={[s.welcomeSub, { color: colors.mutedForeground }]}>
          Platform lengkap manajemen ISO
        </Text>
      </View>

      {/* Stats */}
      <View style={s.statsGrid}>
        {stats.map(stat => (
          <View key={stat.label} style={[s.statCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <Text style={[s.statValue, { color: stat.color }]}>
              {isLoading ? '…' : stat.value}
            </Text>
            <Text style={[s.statLabel, { color: colors.mutedForeground }]}>{stat.label}</Text>
          </View>
        ))}
      </View>

      {/* Quick Access */}
      <Text style={[s.sectionTitle, { color: colors.foreground }]}>Akses Cepat</Text>
      <View style={s.menuGrid}>
        {menuItems.map(item => (
          <TouchableOpacity
            key={item.route}
            style={[s.menuCard, { backgroundColor: colors.card, borderColor: colors.border }]}
            onPress={() => router.push(item.route as any)}
            activeOpacity={0.75}
          >
            <View style={[s.menuIcon, { backgroundColor: item.color + '22' }]}>
              <Ionicons name={item.icon} size={24} color={item.color} />
            </View>
            <Text style={[s.menuTitle, { color: colors.foreground }]}>{item.title}</Text>
            <Text style={[s.menuDesc, { color: colors.mutedForeground }]}>{item.description}</Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* ISO Standards */}
      <Text style={[s.sectionTitle, { color: colors.foreground }]}>Standar Populer</Text>
      <View style={s.isoRow}>
        {isoStandards.map(iso => (
          <View key={iso.label} style={[s.isoChip, { backgroundColor: iso.color + '22', borderColor: iso.color + '55' }]}>
            <Text style={[s.isoLabel, { color: iso.color }]}>{iso.label}</Text>
            <Text style={[s.isoSub, { color: iso.color + 'bb' }]}>{iso.sub}</Text>
          </View>
        ))}
      </View>

      {/* CTA banner */}
      <View style={[s.ctaBanner, { backgroundColor: colors.primary + '22', borderColor: colors.primary + '44' }]}>
        <MaterialCommunityIcons name="certificate-outline" size={28} color={colors.primary} />
        <View style={{ flex: 1, marginLeft: 12 }}>
          <Text style={[s.ctaTitle, { color: colors.foreground }]}>Mulai Sertifikasi</Text>
          <Text style={[s.ctaSub, { color: colors.mutedForeground }]}>Dapatkan sertifikasi ISO dengan panduan AI</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color={colors.primary} />
      </View>
    </ScrollView>
  );
}

const styles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: { flex: 1 },
    header: { paddingHorizontal: 20, paddingBottom: 8, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
    logoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
    logoIcon: { width: 36, height: 36, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
    logoTitle: { fontSize: 18, fontWeight: '700', fontFamily: 'Inter_700Bold' },
    logoSub: { fontSize: 11, fontFamily: 'Inter_400Regular' },
    welcomeBlock: { paddingHorizontal: 20, paddingBottom: 16 },
    welcomeTitle: { fontSize: 24, fontWeight: '700', fontFamily: 'Inter_700Bold', marginBottom: 4 },
    welcomeSub: { fontSize: 14, fontFamily: 'Inter_400Regular' },
    statsGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 10, marginBottom: 24 },
    statCard: {
      flex: 1, minWidth: '44%', padding: 16, borderRadius: 12,
      borderWidth: 1, alignItems: 'center',
    },
    statValue: { fontSize: 28, fontWeight: '700', fontFamily: 'Inter_700Bold' },
    statLabel: { fontSize: 12, marginTop: 2, fontFamily: 'Inter_400Regular' },
    sectionTitle: { fontSize: 16, fontWeight: '600', fontFamily: 'Inter_600SemiBold', paddingHorizontal: 20, marginBottom: 12 },
    menuGrid: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 10, marginBottom: 24 },
    menuCard: {
      flex: 1, minWidth: '44%', padding: 16, borderRadius: 14,
      borderWidth: 1, gap: 8,
    },
    menuIcon: { width: 44, height: 44, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    menuTitle: { fontSize: 15, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
    menuDesc: { fontSize: 12, fontFamily: 'Inter_400Regular' },
    isoRow: { flexDirection: 'row', flexWrap: 'wrap', paddingHorizontal: 16, gap: 8, marginBottom: 24 },
    isoChip: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20, borderWidth: 1, alignItems: 'center' },
    isoLabel: { fontSize: 13, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
    isoSub: { fontSize: 10, fontFamily: 'Inter_400Regular' },
    ctaBanner: {
      marginHorizontal: 16, padding: 16, borderRadius: 14,
      borderWidth: 1, flexDirection: 'row', alignItems: 'center',
    },
    ctaTitle: { fontSize: 15, fontWeight: '600', fontFamily: 'Inter_600SemiBold', marginBottom: 2 },
    ctaSub: { fontSize: 12, fontFamily: 'Inter_400Regular' },
  });
