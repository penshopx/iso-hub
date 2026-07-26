import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Platform,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { useColors } from '@/hooks/useColors';
import { apiFetch, AuditTask, KpiItem } from '@/lib/api';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const STATUS_ICONS: Record<string, keyof typeof Ionicons.glyphMap> = {
  completed: 'checkmark-circle',
  pending: 'time-outline',
  running: 'sync-outline',
};

const STATUS_COLORS: Record<string, string> = {
  completed: '#22c55e',
  pending: '#f59e0b',
  running: '#3b82f6',
};

function KpiCard({ kpi, colors }: { kpi: KpiItem; colors: ReturnType<typeof useColors> }) {
  const pct = Math.min(100, Math.round((kpi.actual / kpi.target) * 100));
  const isAbove = kpi.actual >= kpi.target;
  const barColor = isAbove ? '#22c55e' : '#ef4444';

  return (
    <View style={{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
        <Text style={{ color: colors.foreground, fontSize: 14, fontWeight: '600', flex: 1, fontFamily: 'Inter_600SemiBold' }} numberOfLines={1}>
          {kpi.name}
        </Text>
        <View style={{ backgroundColor: (isAbove ? '#22c55e' : '#ef4444') + '22', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3, marginLeft: 8 }}>
          <Text style={{ color: isAbove ? '#22c55e' : '#ef4444', fontSize: 11, fontWeight: '600' }}>
            {isAbove ? 'Above' : 'Below'}
          </Text>
        </View>
      </View>
      {/* Progress bar */}
      <View style={{ height: 6, borderRadius: 3, backgroundColor: colors.muted, marginBottom: 8 }}>
        <View style={{ height: 6, borderRadius: 3, backgroundColor: barColor, width: `${pct}%` as any }} />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
        <Text style={{ color: colors.mutedForeground, fontSize: 12, fontFamily: 'Inter_400Regular' }}>
          Aktual: <Text style={{ color: barColor, fontWeight: '600' }}>{kpi.actual}{kpi.unit}</Text>
        </Text>
        <Text style={{ color: colors.mutedForeground, fontSize: 12, fontFamily: 'Inter_400Regular' }}>
          Target: {kpi.target}{kpi.unit}
        </Text>
      </View>
    </View>
  );
}

function AuditTaskRow({ task, colors }: { task: AuditTask; colors: ReturnType<typeof useColors> }) {
  const icon = STATUS_ICONS[task.status] ?? 'help-circle-outline';
  const color = STATUS_COLORS[task.status] ?? '#6b7280';
  return (
    <View style={{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 12, padding: 14, marginBottom: 8, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
      <Ionicons name={icon} size={22} color={color} />
      <View style={{ flex: 1 }}>
        <Text style={{ color: colors.foreground, fontSize: 14, fontWeight: '500', fontFamily: 'Inter_500Medium' }} numberOfLines={1}>
          {task.title}
        </Text>
        <Text style={{ color: colors.mutedForeground, fontSize: 11, marginTop: 2, fontFamily: 'Inter_400Regular' }}>
          {task.code} · {task.agentType}
        </Text>
      </View>
      <View style={{ backgroundColor: color + '22', borderRadius: 8, paddingHorizontal: 8, paddingVertical: 4 }}>
        <Text style={{ color, fontSize: 11, fontWeight: '600', textTransform: 'capitalize' }}>{task.status}</Text>
      </View>
    </View>
  );
}

export default function AuditScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const { data: kpiData, isLoading: kpiLoading, refetch: refetchKpi, isRefetching: isRefetchingKpi } = useQuery({
    queryKey: ['kpi'],
    queryFn: () => apiFetch<{ data: KpiItem[] }>('/v1/kpi').then(r => r.data),
  });

  const { data: auditData, isLoading: auditLoading, refetch: refetchAudit } = useQuery({
    queryKey: ['audit'],
    queryFn: () => apiFetch<{ data: AuditTask[] }>('/v1/audit').then(r => r.data),
  });

  const isLoading = kpiLoading || auditLoading;

  const s = styles(colors);

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <View style={[s.header, { paddingTop: topPad + 12 }]}>
        <Text style={[s.headerTitle, { color: colors.foreground }]}>Audit & KPI</Text>
      </View>

      {isLoading ? (
        <View style={s.center}><ActivityIndicator color={colors.primary} size="large" /></View>
      ) : (
        <ScrollView
          contentContainerStyle={{ padding: 16, paddingBottom: bottomPad + 90 }}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={isRefetchingKpi}
              onRefresh={() => { refetchKpi(); refetchAudit(); }}
              tintColor={colors.primary}
            />
          }
        >
          {/* KPI Section */}
          <View style={[s.sectionHeader]}>
            <Ionicons name="bar-chart-outline" size={18} color={colors.primary} />
            <Text style={[s.sectionTitle, { color: colors.foreground }]}>Key Performance Indicators</Text>
          </View>
          {(kpiData ?? []).length === 0 ? (
            <View style={s.empty}>
              <Ionicons name="bar-chart-outline" size={40} color={colors.mutedForeground} />
              <Text style={[s.emptyText, { color: colors.mutedForeground }]}>Tidak ada data KPI</Text>
            </View>
          ) : (
            (kpiData ?? []).map(kpi => <KpiCard key={kpi.id} kpi={kpi} colors={colors} />)
          )}

          {/* Audit Log Section */}
          <View style={[s.sectionHeader, { marginTop: 16 }]}>
            <Ionicons name="clipboard-outline" size={18} color={colors.primary} />
            <Text style={[s.sectionTitle, { color: colors.foreground }]}>Audit Log</Text>
          </View>
          {(auditData ?? []).length === 0 ? (
            <View style={s.empty}>
              <Ionicons name="clipboard-outline" size={40} color={colors.mutedForeground} />
              <Text style={[s.emptyText, { color: colors.mutedForeground }]}>Belum ada aktivitas audit</Text>
            </View>
          ) : (
            (auditData ?? []).map(task => <AuditTaskRow key={task.id} task={task} colors={colors} />)
          )}
        </ScrollView>
      )}
    </View>
  );
}

const styles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: { flex: 1 },
    header: { paddingHorizontal: 20, paddingBottom: 12 },
    headerTitle: { fontSize: 22, fontWeight: '700', fontFamily: 'Inter_700Bold' },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    sectionHeader: { flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 12 },
    sectionTitle: { fontSize: 16, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
    empty: { alignItems: 'center', paddingVertical: 32, gap: 8 },
    emptyText: { fontSize: 14, fontFamily: 'Inter_400Regular' },
  });
