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
import { Vendor } from '@/lib/api';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { useAuth } from '@/lib/auth';
import { createWithOfflineQueue, fetchCollection, makeTemporaryId } from '@/lib/offline';
import { useOfflineStatus } from '@/lib/offline-context';
import { OfflineStatusBanner } from '@/components/OfflineStatusBanner';

const STATUS_COLORS: Record<string, string> = {
  active: '#22c55e',
  inactive: '#ef4444',
  pending: '#f59e0b',
};

function VendorCard({ vendor, colors }: { vendor: Vendor; colors: ReturnType<typeof useColors> }) {
  const statusColor = STATUS_COLORS[vendor.status] ?? '#6b7280';
  const initials = vendor.name
    .split(' ')
    .slice(0, 2)
    .map(w => w[0]?.toUpperCase() ?? '')
    .join('');

  return (
    <View style={{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 14, padding: 16, marginBottom: 10 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ width: 44, height: 44, borderRadius: 22, backgroundColor: colors.primary + '22', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: colors.primary, fontSize: 16, fontWeight: '700', fontFamily: 'Inter_700Bold' }}>{initials}</Text>
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Text style={{ color: colors.foreground, fontSize: 15, fontWeight: '600', fontFamily: 'Inter_600SemiBold' }} numberOfLines={1}>
              {vendor.name}
            </Text>
            <View style={{ backgroundColor: statusColor + '22', borderRadius: 20, paddingHorizontal: 8, paddingVertical: 3 }}>
              <Text style={{ color: statusColor, fontSize: 11, fontWeight: '600', textTransform: 'capitalize' }}>{vendor.status}</Text>
            </View>
          </View>
          {vendor.category ? (
            <Text style={{ color: colors.mutedForeground, fontSize: 12, fontFamily: 'Inter_400Regular', marginTop: 2 }}>{vendor.category}</Text>
          ) : null}
        </View>
      </View>
      {(vendor.contactPerson || vendor.email || vendor.phone) ? (
        <View style={{ marginTop: 12, paddingTop: 12, borderTopWidth: 1, borderTopColor: colors.border, gap: 6 }}>
          {vendor.contactPerson ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="person-outline" size={14} color={colors.mutedForeground} />
              <Text style={{ color: colors.mutedForeground, fontSize: 13, fontFamily: 'Inter_400Regular' }}>{vendor.contactPerson}</Text>
            </View>
          ) : null}
          {vendor.email ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="mail-outline" size={14} color={colors.mutedForeground} />
              <Text style={{ color: colors.mutedForeground, fontSize: 13, fontFamily: 'Inter_400Regular' }}>{vendor.email}</Text>
            </View>
          ) : null}
          {vendor.phone ? (
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
              <Ionicons name="call-outline" size={14} color={colors.mutedForeground} />
              <Text style={{ color: colors.mutedForeground, fontSize: 13, fontFamily: 'Inter_400Regular' }}>{vendor.phone}</Text>
            </View>
          ) : null}
        </View>
      ) : null}
      {vendor.pendingSync ? (
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 10 }}>
          <Ionicons name="cloud-upload-outline" size={13} color={colors.primary} />
          <Text style={{ color: colors.primary, fontSize: 11, fontFamily: 'Inter_500Medium' }}>
            Menunggu sinkronisasi
          </Text>
        </View>
      ) : null}
    </View>
  );
}

interface AddVendorForm {
  name: string;
  category: string;
  contactPerson: string;
  email: string;
  phone: string;
  status: string;
}

export default function VendorsScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const qc = useQueryClient();
  const { user } = useAuth();
  const { markOnline, markOffline, markQueued } = useOfflineStatus();
  const [showAdd, setShowAdd] = useState(false);
  const [form, setForm] = useState<AddVendorForm>({
    name: '', category: '', contactPerson: '', email: '', phone: '', status: 'active',
  });

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const { data, isLoading, refetch, isRefetching } = useQuery({
    queryKey: ['vendors', user?.id],
    enabled: Boolean(user?.id),
    queryFn: () => fetchCollection<Vendor>({
      userId: user!.id,
      collection: 'vendors',
      endpoint: '/v1/vendors',
      onNetworkSuccess: markOnline,
      onNetworkError: markOffline,
    }),
  });

  const addMutation = useMutation({
    mutationFn: async (body: AddVendorForm) => {
      if (!user?.id) throw new Error('User is not authenticated');

      return createWithOfflineQueue<Vendor>({
        userId: user.id,
        collection: 'vendors',
        endpoint: '/v1/vendors',
        payload: { ...body },
        optimistic: {
          id: makeTemporaryId(),
          name: body.name.trim(),
          category: body.category || null,
          contactPerson: body.contactPerson || null,
          email: body.email || null,
          phone: body.phone || null,
          status: body.status || 'active',
          createdAt: new Date().toISOString(),
        },
      });
    },
    onSuccess: result => {
      const queryKey = ['vendors', user?.id];
      if (result.queued) {
        markQueued();
        qc.setQueryData<Vendor[]>(queryKey, current => [
          result.data,
          ...(current ?? []).filter(item => item.id !== result.data.id),
        ]);
      } else {
        markOnline();
        void qc.invalidateQueries({ queryKey });
      }
      qc.invalidateQueries({ queryKey: ['dashboard'] });
      setShowAdd(false);
      setForm({ name: '', category: '', contactPerson: '', email: '', phone: '', status: 'active' });
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      if (result.queued) {
        Alert.alert(
          'Tersimpan di perangkat',
          'Vendor akan otomatis dikirim ke akun Anda saat koneksi internet kembali.',
        );
      }
    },
    onError: () => Alert.alert('Error', 'Gagal menambahkan vendor.'),
  });

  const s = styles(colors);

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      <View style={[s.header, { paddingTop: topPad + 12 }]}>
        <Text style={[s.headerTitle, { color: colors.foreground }]}>Vendor</Text>
        <TouchableOpacity
          style={[s.addBtn, { backgroundColor: colors.primary }]}
          onPress={() => { Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light); setShowAdd(true); }}
        >
          <Ionicons name="add" size={22} color="#fff" />
        </TouchableOpacity>
      </View>
      <OfflineStatusBanner />

      {isLoading ? (
        <View style={s.center}><ActivityIndicator color={colors.primary} size="large" /></View>
      ) : (
        <FlatList
          data={data ?? []}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => <VendorCard vendor={item} colors={colors} />}
          contentContainerStyle={{ padding: 16, paddingBottom: bottomPad + 90 }}
          showsVerticalScrollIndicator={false}
          onRefresh={refetch}
          refreshing={isRefetching}
          scrollEnabled={!!(data && data.length > 0)}
          ListEmptyComponent={
            <View style={s.empty}>
              <Ionicons name="business-outline" size={48} color={colors.mutedForeground} />
              <Text style={[s.emptyText, { color: colors.mutedForeground }]}>Belum ada vendor terdaftar</Text>
              <Text style={[s.emptyHint, { color: colors.mutedForeground }]}>Ketuk + untuk menambahkan vendor</Text>
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
            <Text style={[s.modalTitle, { color: colors.foreground }]}>Tambah Vendor</Text>
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
                {([
                  { key: 'name', label: 'Nama Vendor *', placeholder: 'PT. Contoh Vendor', kb: 'default' },
                  { key: 'category', label: 'Kategori', placeholder: 'IT, Logistik, dll', kb: 'default' },
                  { key: 'contactPerson', label: 'Kontak Person', placeholder: 'Nama PIC', kb: 'default' },
                  { key: 'email', label: 'Email', placeholder: 'vendor@email.com', kb: 'email-address' },
                  { key: 'phone', label: 'Telepon', placeholder: '08xx-xxxx-xxxx', kb: 'phone-pad' },
                ] as const).map(field => (
                  <View key={field.key}>
                    <Text style={[s.label, { color: colors.mutedForeground }]}>{field.label}</Text>
                    <TextInput
                      style={[s.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }]}
                      value={form[field.key]}
                      onChangeText={v => setForm(f => ({ ...f, [field.key]: v }))}
                      placeholder={field.placeholder}
                      placeholderTextColor={colors.mutedForeground}
                      keyboardType={field.kb as any}
                      autoCapitalize={field.kb === 'email-address' ? 'none' : 'words'}
                    />
                  </View>
                ))}
                {/* Status picker */}
                <View>
                  <Text style={[s.label, { color: colors.mutedForeground }]}>Status</Text>
                  <View style={{ flexDirection: 'row', gap: 8 }}>
                    {['active', 'inactive', 'pending'].map(st => (
                      <TouchableOpacity
                        key={st}
                        onPress={() => setForm(f => ({ ...f, status: st }))}
                        style={{
                          flex: 1, padding: 10, borderRadius: 10, borderWidth: 1, alignItems: 'center',
                          backgroundColor: form.status === st ? colors.primary + '22' : colors.card,
                          borderColor: form.status === st ? colors.primary : colors.border,
                        }}
                      >
                        <Text style={{
                          color: form.status === st ? colors.primary : colors.mutedForeground,
                          fontSize: 13, fontWeight: '500', textTransform: 'capitalize', fontFamily: 'Inter_500Medium',
                        }}>{st}</Text>
                      </TouchableOpacity>
                    ))}
                  </View>
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
