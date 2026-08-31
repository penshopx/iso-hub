"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useLocation } from 'wouter';
import { useAppPreferences } from "@/components/app-preferences-context";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
  actions?: string[];
  taskData?: Record<string, string>;
  intent?: string;
}

const personality = {
  name: "ISO Hub Assistant",
  role: "Agentic Helpdesk",
  tagline: "Panduan • Eksekusi • Mentoring",
  greeting: `Halo! 👋

Saya **ISO Hub Assistant**, asisten digital Anda dengan kemampuan:

🎯 **Panduan** - Informasi ISO lengkap step-by-step
⚡ **Eksekusi** - Buat dokumen, jadwalkan, booking layanan
🎓 **Mentoring** - Bimbing implementasi ISO dari nol

Contoh perintah:
• "Apa itu ISO 9001?" → Informasi
• "Buat Manual Mutu" → Eksekusi
• "Panduan sertifikasi" → Mentoring
• "Bantu saya" → Menu bantuan

Ada yang bisa saya bantu hari ini?`,
};

const quickActions = [
  { label: "📚 Info ISO", prompt: "Apa itu ISO 9001?" },
  { label: "📝 Buat Dokumen", prompt: "Buat Manual Mutu" },
  { label: "🎓 Panduan", prompt: "Panduan sertifikasi" },
  { label: "📅 Booking", prompt: "Booking layanan konsultasi" },
  { label: "🔍 Cari", prompt: "Cari template ISO" },
  { label: "❓ Help", prompt: "Bantu saya" },
];

export default function FloatingChatbot() {
  const [, navigate] = useLocation();
  const { speak } = useAppPreferences();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content: personality.greeting,
      timestamp: new Date(),
      actions: ["Info ISO", "Buat Dokumen", "Panduan", "Booking"],
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [sessionId, setSessionId] = useState<string>("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const newSessionId = `chat_${Date.now()}_${Math.random().toString(36).substring(7)}`;
    setSessionId(newSessionId);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleNavigation = useCallback((action: string) => {
    const routes: Record<string, string> = {
      "Info ISO": "/perpustakaan",
      "Buat Dokumen": "/dokumen",
      "Panduan": "/learning",
      "Booking": "/layanan",
      "Lihat Layanan": "/layanan",
      "Booking Sekarang": "/layanan",
      "ISO 9001": "/perpustakaan",
      "ISO 14001": "/iso/iso14001",
      "ISO 45001": "/iso/iso45001",
      "Sertifikasi": "/sertifikasi",
      "Dokumen": "/dokumen",
      "Risk Assessment": "/risiko",
      "Audit Checklist": "/audit",
      "Dokumen Template": "/dokumen",
      "Risk Register": "/risiko",
      "Generate Template": "/dokumen",
      "Lihat Daftar Dokumen": "/dokumen",
      "Bantuan Lebih Lanjut": "/perpustakaan",
      "Cek Jadwal": "/kalender-kepatuhan",
      "Lihat Kalender": "/kalender-kepatuhan",
      "Booking Langsung": "/layanan",
      "Hubungi Konsultan": "/fasilitator",
      "Tanya ISO": "/perpustakaan",
      "Pelajari ISO": "/perpustakaan",
      "Tanya Lagi": "/perpustakaan",
      "Keluar": "/",
      "Mulai Sekarang": "/sertifikasi",
      "Buka Dashboard": "/",
      "Ke Learning": "/learning",
    };

    const route = routes[action];
    if (route) {
      navigate(route);
      setIsOpen(false);
    }
  }, [navigate]);

  const sendMessage = useCallback(async (content: string) => {
    if (!content.trim()) return;

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    try {
      const response = await fetch("/api/v1/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, sessionId }),
      });

      const data = await response.json();

      if (data.success) {
        const assistantMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: data.data.response,
          timestamp: new Date(),
          actions: data.data.actions,
          taskData: data.data.taskData,
          intent: data.data.intent,
        };
        setMessages((prev) => [...prev, assistantMessage]);
        speak(assistantMessage.content);
      } else {
        const errorMessage: Message = {
          id: crypto.randomUUID(),
          role: "assistant",
          content: "Maaf, terjadi kesalahan. Silakan coba lagi.",
          timestamp: new Date(),
        };
        setMessages((prev) => [...prev, errorMessage]);
      }
    } catch (error) {
      const errorMessage: Message = {
        id: crypto.randomUUID(),
        role: "assistant",
        content: "Maaf, terjadi kesalahan koneksi. Silakan coba lagi.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  }, [sessionId]);

  const handleSend = useCallback(() => {
    sendMessage(input);
  }, [input, sendMessage]);

  const handleQuickAction = (prompt: string) => {
    sendMessage(prompt);
  };

  const handleActionClick = (action: string, messageId: string) => {
    const message = messages.find((m) => m.id === messageId);
    if (!message) return;

    if (message.intent === "create" || message.taskData?.type === "create_document") {
      handleNavigation("Buat Dokumen");
    } else if (message.intent === "book" || message.taskData?.type === "book") {
      handleNavigation("Booking Sekarang");
    } else if (message.intent === "search" || message.taskData?.type === "search") {
      handleNavigation("Cari");
    } else if (message.intent === "mentor" || message.intent === "guide") {
      handleNavigation("Panduan");
    } else {
      const route = Object.entries({
        "Info ISO": "/perpustakaan",
        "Buat Dokumen": "/dokumen",
        "Panduan": "/learning",
        "Booking": "/layanan",
        "ISO 9001": "/perpustakaan",
        "ISO 14001": "/iso/iso14001",
        "ISO 45001": "/iso/iso45001",
        "Sertifikasi": "/sertifikasi",
        "Dokumen": "/dokumen",
        "Risk Assessment": "/risiko",
        "Audit Checklist": "/audit",
        "Risk Register": "/risiko",
        "Generate Template": "/dokumen",
        "Lihat Daftar Dokumen": "/dokumen",
        "Cek Jadwal": "/kalender-kepatuhan",
        "Lihat Kalender": "/kalender-kepatuhan",
        "Booking Langsung": "/layanan",
        "Hubungi Konsultan": "/fasilitator",
        "Lihat Layanan": "/layanan",
        "Booking Sekarang": "/layanan",
        "Pelajari ISO": "/perpustakaan",
        "Tanya Lagi": "/perpustakaan",
        "Mulai Sekarang": "/sertifikasi",
      }).find(([key]) => key === action)?.[1];

      if (route) {
        navigate(route);
        setIsOpen(false);
      } else {
        sendMessage(action);
      }
    }
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-[9999] group"
        aria-label="Open chat"
      >
        <div className="relative">
          {!isOpen && (
            <div className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center text-xs font-bold animate-pulse">
              AI
            </div>
          )}
          <div className="w-16 h-16 bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 flex items-center justify-center group-hover:scale-110">
            {isOpen ? (
              <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <div className="relative">
                <svg className="w-7 h-7 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
            )}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="fixed bottom-24 right-6 z-[9998] w-96 max-w-[calc(100vw-3rem)] h-[580px] bg-neutral-900 rounded-2xl shadow-2xl border border-neutral-700 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 fade-in duration-300">
          <div className="bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 p-4 flex items-center gap-3">
            <div className="relative">
              <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-purple-600"></div>
            </div>
            <div>
              <h3 className="font-semibold text-white">{personality.name}</h3>
              <p className="text-xs text-blue-100">{personality.tagline}</p>
            </div>
            <div className="ml-auto flex gap-1">
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                title="Minimize"
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[90%] ${message.role === "user" ? "order-2" : "order-1"}`}>
                  <div
                    className={`rounded-2xl px-4 py-3 ${
                      message.role === "user"
                        ? "bg-blue-600 text-white rounded-br-md"
                        : "bg-neutral-800 text-neutral-100 rounded-bl-md border border-neutral-700"
                    }`}
                  >
                    <div className="flex gap-2 mb-1">
                      {message.role === "assistant" && (
                        <span className="text-xs">🤖</span>
                      )}
                      <p className="text-sm whitespace-pre-line">{message.content}</p>
                    </div>
                    <p className={`text-xs mt-2 ${message.role === "user" ? "text-blue-200" : "text-neutral-500"}`}>
                      {message.timestamp.toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" })}
                    </p>
                  </div>

                  {message.actions && message.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {message.actions.map((action, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleActionClick(action, message.id)}
                          className="px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 rounded-full text-xs text-neutral-200 transition-colors"
                        >
                          {action}
                        </button>
                      ))}
                    </div>
                  )}

                  {message.intent === "create" && message.taskData?.documentType && (
                    <div className="mt-2 p-2 bg-purple-900/30 border border-purple-500/30 rounded-lg">
                      <p className="text-xs text-purple-300">
                        📝 Membuat: <span className="font-semibold">{message.taskData.documentType}</span>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-neutral-800 rounded-2xl rounded-bl-md px-4 py-3 border border-neutral-700">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                    <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="px-4 py-2 border-t border-neutral-700 bg-neutral-800/50">
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
              {quickActions.map((action, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickAction(action.prompt)}
                  className="flex-shrink-0 px-3 py-1.5 bg-neutral-800 hover:bg-neutral-700 border border-neutral-600 rounded-full text-xs text-neutral-300 transition-colors"
                >
                  {action.label}
                </button>
              ))}
            </div>
          </div>

          <div className="p-4 border-t border-neutral-700">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Ketik perintah atau pertanyaan..."
                className="flex-1 px-4 py-2.5 bg-neutral-800 border border-neutral-600 rounded-xl text-white placeholder-neutral-500 focus:outline-none focus:border-purple-500 text-sm"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isTyping}
                className="px-4 py-2.5 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-neutral-600 disabled:to-neutral-600 disabled:cursor-not-allowed rounded-xl transition-all"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>

          <div className="px-4 pb-3 text-center border-t border-neutral-700 bg-neutral-800/30">
            <p className="text-xs text-neutral-500">
              Agentic Assistant • Powered by AI •
              <button onClick={() => navigate("/agents")} className="text-purple-400 hover:underline ml-1">
                Learn more
              </button>
            </p>
          </div>
        </div>
      )}
    </>
  );
}
