import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
  Alert,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useColors } from '@/hooks/useColors';
import { apiFetch, Risk } from '@/lib/api';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

const LEVEL_COLORS: Record<string, string> = {
  critical: '#ef4444',
  high: '#f97316',
  medium: '#eab308',
  low: '#22c55e',
};

function RiskBadge({ level }: { level: string }) {
  const color = LEVEL_COLORS[level] ?? '#6b7280';
  return (
    <View style={{ backgroundColor: color + '22', borderRadius: 20, paddingHorizontal: 10, paddingVertical: 3 }}>
      <Text style={{ color, fontSize: 11, fontWeight: '600', textTransform: 'capitalize' }}>{level}</Text>
    </View>
  );
}

function RiskCard({ risk, colors }: { risk: Risk; colors: ReturnType<typeof useColors> }) {
  return (
    <View style={[{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 10 }]}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 6 }}>
        <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: '600', flex: 1, marginRight: 8, fontFamily: 'Inter_600SemiBold' }}>
          {risk.name}
        </Text>
        <RiskBadge level={risk.riskLevel} />
      </View>
      {risk.description ? (
        <Text style={{ color: colors.mutedForeground, fontSize: 13, marginBottom: 8, fontFamily: 'Inter_400Regular' }} numberOfLines={2}>
          {risk.description}
        </Text>
      ) : null}
      <View style={{ flexDirection: 'row', gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Ionicons name="trending-up-outline" size={13} color={colors.mutedForeground} />
          <Text style={{ color: colors.mutedForeground, fontSize: 12, fontFamily: 'Inter_400Regular' }}>
            Prob: {risk.probability}
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Ionicons name="flash-outline" size={13} color={colors.mutedForeground} />
          <Text style={{ color: colors.mutedForeground, fontSize: 12, fontFamily: 'Inter_400Regular' }}>
            Impact: {risk.impact}
          </Text>
        </View>
        {risk.owner ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Ionicons name="person-outline" size={13} color={colors.mutedForeground} />
            <Text style={{ color: colors.mutedForeground, fontSize: 12, fontFamily: 'Inter_400Regular' }} numberOfLines={1}>
              {risk.owner}
            </Text>
          </View>
        ) : null}
      </View>
    </View>
  );
}

interface AddRiskForm {
  name: string;
  description: string;
  category: string;
  probability: string;
  impact: string;
  owner: string;
  mitigation: string;
}

export default function RisksScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<AddRiskForm>({
    name: '', description: '', category: '', probability: '3', impact: '3', owner: '', mitigation: '',
  });

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['risks'],
    queryFn: () => apiFetch<{ data: Risk[]; total: number }>('/v1/risks').then(r => r.data),
  });

  const addMutation = useMutation({
    mutationFn: (body: AddRiskForm) =>
      apiFetch<{ success: boolean }>('/v1/risks', { method: 'POST', body: JSON.stringify(body) }),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ['risks'] });
      qc.invalidateQueries({ queryKey: ['dashboard'] });
      setShowAdd(false);
      setForm({ name: '', description: '', category: '', probability: '3', impact: '3', owner: '', mitigation: '' });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    },
    onError: () => Alert.alert('Error', 'Gagal menambahkan risiko.'),
  });

  const s = styles(colors);

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[s.header, { paddingTop: topPad + 12 }]}>
        <Text style={[s.headerTitle, { color: colors.foreground }]}>Manajemen Risiko</Text>
        <TouchableOpacity
          style={[s.addBtn, { backgroundColor: colors.primary }]}
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setShowAdd(true); }}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {isLoading ? (
        <View style={s.center}>
          <ActivityIndicator color={colors.primary} size="large" />
        </View>
      ) : (
        <FlatList
          data={data ?? []}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <RiskCard risk={item} colors={colors} />}
          contentContainerStyle={{ padding: 16, paddingBottom: bottomPad + 90 }}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isRefetching}
          scrollEnabled={!!(data && data.length > 0)}
          ListEmptyComponent={
            <View style={s.empty}>
              <Ionicons name="warning-outline" size={48} color={colors.mutedForeground} />
              <Text style={[s.emptyText, { color: colors.mutedForeground }]}>Belum ada risiko terdaftar</Text>
              <Text style={[s.emptyHint, { color: colors.mutedForeground }]}>Ketuk + untuk menambahkan risiko baru</Text>
            </View>
          }
        />
      )}

      {/* Add Modal */}
      <Modal visible={showAdd} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setShowAdd(false)}>
        <View style={[s.modal, { backgroundColor: colors.background }]}>
          <View style={[s.modalHeader, { borderBottomColor: colors.border }]}>
            <TouchableOpacity onPress={() => setShowAdd(false)}>
              <Ionicons name="close" size={24} color={colors.foreground} />
            </TouchableOpacity>
            <Text style={[s.modalTitle, { color: colors.foreground }]}>Tambah Risiko</Text>
            <TouchableOpacity
              onPress={() => addMutation.mutate(form)}
              disabled={!form.name.trim() || addMutation.isPending}
            >
              {addMutation.isPending
                ? <ActivityIndicator color={colors.primary} size="small" />
                : <Text style={[s.saveBtn, { color: form.name.trim() ? colors.primary : colors.mutedForeground }]}>Simpan</Text>
              }
            </TouchableOpacity>
          </View>
          <FlatList
            data={[0]}
            keyExtractor={() => 'form'}
            renderItem={() => (
              <View style={{ padding: 16, gap: 14 }}>
                <View>
                  <Text style={[s.label, { color: colors.mutedForeground }]}>Nama Risiko *</Text>
                  <TextInput
                    style={[s.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }]}
                    value={form.name}
                    onChangeText={v => setForm(f => ({ ...f, name: v }))}
                    placeholder="Nama risiko"
                    placeholderTextColor={colors.mutedForeground}
                  />
                </View>
                <View>
                  <Text style={[s.label, { color: colors.mutedForeground }]}>Deskripsi</Text>
                  <TextInput
                    style={[s.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, height: 80, textAlignVertical: 'top' }]}
                    value={form.description}
                    onChangeText={v => setForm(f => ({ ...f, description: v }))}
                    placeholder="Deskripsi risiko"
                    placeholderTextColor={colors.mutedForeground}
                    multiline
                  />
                </View>
                <View>
                  <Text style={[s.label, { color: colors.mutedForeground }]}>Kategori</Text>
                  <TextInput
                    style={[s.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }]}
                    value={form.category}
                    onChangeText={v => setForm(f => ({ ...f, category: v }))}
                    placeholder="Operasional, Keuangan, dll"
                    placeholderTextColor={colors.mutedForeground}
                  />
                </View>
                <View style={{ flexDirection: 'row', gap: 12 }}>
                  <View style={{ flex: 1 }}>
                    <Text style={[s.label, { color: colors.mutedForeground }]}>Probabilitas (1-5)</Text>
                    <TextInput
                      style={[s.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }]}
                      value={form.probability}
                      onChangeText={v => setForm(f => ({ ...f, probability: v }))}
                      keyboardType="number-pad"
                    />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[s.label, { color: colors.mutedForeground }]}>Dampak (1-5)</Text>
                    <TextInput
                      style={[s.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }]}
                      value={form.impact}
                      onChangeText={v => setForm(f => ({ ...f, impact: v }))}
                      keyboardType="number-pad"
                    />
                  </View>
                </View>
                <View>
                  <Text style={[s.label, { color: colors.mutedForeground }]}>Pemilik Risiko</Text>
                  <TextInput
                    style={[s.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }]}
                    value={form.owner}
                    onChangeText={v => setForm(f => ({ ...f, owner: v }))}
                    placeholder="Nama atau jabatan"
                    placeholderTextColor={colors.mutedForeground}
                  />
                </View>
                <View>
                  <Text style={[s.label, { color: colors.mutedForeground }]}>Mitigasi</Text>
                  <TextInput
                    style={[s.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground, height: 80, textAlignVertical: 'top' }]}
                    value={form.mitigation}
                    onChangeText={v => setForm(f => ({ ...f, mitigation: v }))}
                    placeholder="Rencana mitigasi risiko"
                    placeholderTextColor={colors.mutedForeground}
                    multiline
                  />
                </View>
              </View>
            )}
            keyboardShouldPersistTaps="handled"
          />
        </View>
      </Modal>
    </View>
  );
}

const styles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: { flex: 1 },
    header: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      paddingHorizontal: 20, paddingBottom: 12,
    },
    headerTitle: { fontSize: 22, fontWeight: '700', fontFamily: 'Inter_700Bold' },
    addBtn: { width: 38, height: 38, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
    center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
    empty: { alignItems: 'center', paddingTop: 60, gap: 8 },
    emptyText: { fontSize: 16, fontWeight: '500', fontFamily: 'Inter_500Medium' },
    emptyHint: { fontSize: 13, fontFamily: 'Inter_400Regular' },
    modal: { flex: 1 },
    modalHeader: {
      flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
      padding: 16, borderBottomWidth: 1,
    },
    modalTitle: { fontSize: 17, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
    saveBtn: { fontSize: 16, fontWeight: '600', fontFamily: 'Inter_600SemiBold' },
    label: { fontSize: 12, marginBottom: 6, fontFamily: 'Inter_500Medium' },
    input: {
      borderWidth: 1, borderRadius: 10, padding: 12,
      fontSize: 14, fontFamily: 'Inter_400Regular',
    },
  });
