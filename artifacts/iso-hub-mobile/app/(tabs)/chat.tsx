import React, { useState, useRef, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TextInput,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { KeyboardAvoidingView } from 'react-native-keyboard-controller';
import { useColors } from '@/hooks/useColors';
import { apiFetch, ChatResponse } from '@/lib/api';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  actions?: string[];
}

const GREETING: Message = {
  id: '0',
  role: 'assistant',
  content: 'Halo! Saya ISO Hub Assistant.\n\nSaya siap membantu Anda dengan informasi tentang standar ISO, implementasi, audit, dan sertifikasi.\n\nApa yang ingin Anda ketahui?',
  actions: ['Info ISO', 'Buat Dokumen', 'Panduan', 'Booking'],
};

const QUICK_PROMPTS = [
  { label: 'ISO 9001', prompt: 'Apa itu ISO 9001?' },
  { label: 'ISO 14001', prompt: 'Apa itu ISO 14001?' },
  { label: 'ISO 45001', prompt: 'Apa itu ISO 45001 dan K3?' },
  { label: 'Sertifikasi', prompt: 'Bagaimana cara mendapatkan sertifikasi ISO?' },
];

function MessageBubble({ message, colors, onAction }: {
  message: Message;
  colors: ReturnType<typeof useColors>;
  onAction: (prompt: string) => void;
}) {
  const isUser = message.role === 'user';
  return (
    <View style={{ marginBottom: 12, alignItems: isUser ? 'flex-end' : 'flex-start' }}>
      {!isUser && (
        <View style={{
          width: 28, height: 28, borderRadius: 14,
          backgroundColor: colors.primary, alignItems: 'center', justifyContent: 'center',
          marginBottom: 4,
        }}>
          <Ionicons name="sparkles" size={14} color="#fff" />
        </View>
      )}
      <View style={{
        maxWidth: '85%',
        backgroundColor: isUser ? colors.primary : colors.card,
        borderColor: isUser ? 'transparent' : colors.border,
        borderWidth: isUser ? 0 : 1,
        borderRadius: 18,
        borderBottomRightRadius: isUser ? 4 : 18,
        borderBottomLeftRadius: isUser ? 18 : 4,
        padding: 12,
      }}>
        <Text style={{
          color: isUser ? '#fff' : colors.foreground,
          fontSize: 14,
          lineHeight: 20,
          fontFamily: 'Inter_400Regular',
        }}>
          {message.content}
        </Text>
      </View>
      {message.actions && message.actions.length > 0 && (
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 8, maxWidth: '85%' }}>
          {message.actions.map((action, idx) => (
            <TouchableOpacity
              key={idx}
              onPress={() => onAction(action)}
              style={{
                paddingHorizontal: 12, paddingVertical: 6,
                borderRadius: 16, borderWidth: 1,
                borderColor: colors.primary + '55',
                backgroundColor: colors.primary + '11',
              }}
            >
              <Text style={{ color: colors.primary, fontSize: 12, fontWeight: '500', fontFamily: 'Inter_500Medium' }}>
                {action}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

export default function ChatScreen() {
  const colors = useColors();
  const insets = useSafeAreaInsets();
  const [messages, setMessages] = useState<Message[]>([GREETING]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const inputRef = useRef<TextInput>(null);

  const topPad = Platform.OS === 'web' ? 67 : insets.top;
  const bottomPad = Platform.OS === 'web' ? 34 : insets.bottom;

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || isTyping) return;

    const userMsg: Message = {
      id: Date.now().toString() + Math.random().toString(36).substr(2, 6),
      role: 'user',
      content: trimmed,
    };
    setMessages(prev => [userMsg, ...prev]);
    setInput('');
    setIsTyping(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    try {
      const data = await apiFetch<{ success: boolean; data: ChatResponse }>('/v1/chat', {
        method: 'POST',
        body: JSON.stringify({ message: trimmed }),
      });
      if (data.success) {
        const assistantMsg: Message = {
          id: Date.now().toString() + Math.random().toString(36).substr(2, 6),
          role: 'assistant',
          content: data.data.response,
          actions: data.data.actions,
        };
        setMessages(prev => [assistantMsg, ...prev]);
      }
    } catch {
      const errMsg: Message = {
        id: Date.now().toString() + Math.random().toString(36).substr(2, 6),
        role: 'assistant',
        content: 'Maaf, terjadi kesalahan koneksi. Silakan coba lagi.',
      };
      setMessages(prev => [errMsg, ...prev]);
    } finally {
      setIsTyping(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isTyping]);

  const s = styles(colors);

  return (
    <View style={[s.container, { backgroundColor: colors.background }]}>
      {/* Header */}
      <View style={[s.header, { paddingTop: topPad + 12, borderBottomColor: colors.border }]}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <View style={[s.avatarCircle, { backgroundColor: colors.primary }]}>
            <Ionicons name="sparkles" size={18} color="#fff" />
          </View>
          <View>
            <Text style={[s.headerTitle, { color: colors.foreground }]}>ISO Hub Assistant</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
              <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: '#22c55e' }} />
              <Text style={{ color: '#22c55e', fontSize: 11, fontFamily: 'Inter_400Regular' }}>Online</Text>
            </View>
          </View>
        </View>
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" keyboardVerticalOffset={0}>
        {/* Inverted message list */}
        <FlatList
          data={messages}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <MessageBubble message={item} colors={colors} onAction={sendMessage} />
          )}
          contentContainerStyle={{ paddingHorizontal: 16, paddingTop: 12, paddingBottom: 8 }}
          inverted
          keyboardDismissMode="interactive"
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          ListHeaderComponent={isTyping ? (
            <View style={{ marginBottom: 12, alignItems: 'flex-start' }}>
              <View style={{ backgroundColor: colors.card, borderColor: colors.border, borderWidth: 1, borderRadius: 18, borderBottomLeftRadius: 4, padding: 12 }}>
                <View style={{ flexDirection: 'row', gap: 4, alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <View key={i} style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: colors.mutedForeground }} />
                  ))}
                </View>
              </View>
            </View>
          ) : null}
        />

        {/* Quick prompts */}
        <FlatList
          data={QUICK_PROMPTS}
          keyExtractor={item => item.label}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => sendMessage(item.prompt)}
              style={[s.quickChip, { backgroundColor: colors.card, borderColor: colors.border }]}
            >
              <Text style={{ color: colors.foreground, fontSize: 12, fontFamily: 'Inter_400Regular' }}>{item.label}</Text>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: 16, paddingVertical: 8, gap: 8 }}
          style={[s.quickBar, { borderTopColor: colors.border }]}
        />

        {/* Input bar */}
        <View style={[s.inputBar, { borderTopColor: colors.border, paddingBottom: bottomPad + 8 }]}>
          <TextInput
            ref={inputRef}
            style={[s.input, { backgroundColor: colors.card, borderColor: colors.border, color: colors.foreground }]}
            value={input}
            onChangeText={setInput}
            placeholder="Ketik pertanyaan Anda..."
            placeholderTextColor={colors.mutedForeground}
            returnKeyType="send"
            onSubmitEditing={() => sendMessage(input)}
            multiline
            maxLength={500}
          />
          <TouchableOpacity
            style={[s.sendBtn, { backgroundColor: input.trim() && !isTyping ? colors.primary : colors.muted }]}
            onPress={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
          >
            {isTyping
              ? <ActivityIndicator size="small" color={colors.mutedForeground} />
              : <Ionicons name="send" size={18} color={input.trim() ? '#fff' : colors.mutedForeground} />
            }
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = (colors: ReturnType<typeof useColors>) =>
  StyleSheet.create({
    container: { flex: 1 },
    header: { paddingHorizontal: 20, paddingBottom: 14, borderBottomWidth: 1 },
    headerTitle: { fontSize: 16, fontWeight: '700', fontFamily: 'Inter_700Bold' },
    avatarCircle: { width: 36, height: 36, borderRadius: 18, alignItems: 'center', justifyContent: 'center' },
    quickBar: { borderTopWidth: 1 },
    quickChip: {
      paddingHorizontal: 14, paddingVertical: 7,
      borderRadius: 20, borderWidth: 1,
    },
    inputBar: {
      flexDirection: 'row', alignItems: 'flex-end', gap: 10,
      paddingHorizontal: 16, paddingTop: 10,
      borderTopWidth: 1,
    },
    input: {
      flex: 1, borderWidth: 1, borderRadius: 22,
      paddingHorizontal: 16, paddingVertical: 10,
      fontSize: 14, maxHeight: 120, fontFamily: 'Inter_400Regular',
    },
    sendBtn: {
      width: 42, height: 42, borderRadius: 21,
      alignItems: 'center', justifyContent: 'center',
    },
  });
