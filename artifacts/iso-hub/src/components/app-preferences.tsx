import { useCallback, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { Moon, Sun, Volume2, VolumeX } from "lucide-react";
import {
  AppPreferencesContext,
  useAppPreferences,
  type Theme,
} from "@/components/app-preferences-context";
import { Switch } from "@/components/ui/switch";

const THEME_STORAGE_KEY = "iso-hub-theme";
const VOICE_STORAGE_KEY = "iso-hub-voice-enabled";

export function AppPreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>(() => {
    if (typeof window === "undefined") return "dark";
    return window.localStorage.getItem(THEME_STORAGE_KEY) === "light" ? "light" : "dark";
  });
  const [voiceEnabled, setVoiceEnabledState] = useState(() => {
    if (typeof window === "undefined") return false;
    return window.localStorage.getItem(VOICE_STORAGE_KEY) === "true";
  });

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.theme = theme;
    root.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(THEME_STORAGE_KEY, theme);
  }, [theme]);

  useEffect(() => {
    window.localStorage.setItem(VOICE_STORAGE_KEY, String(voiceEnabled));
    if (!voiceEnabled && "speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
  }, [voiceEnabled]);

  const setTheme = useCallback((nextTheme: Theme) => {
    setThemeState(nextTheme);
  }, []);

  const setVoiceEnabled = useCallback((enabled: boolean) => {
    setVoiceEnabledState(enabled);
  }, []);

  const speak = useCallback(
    (text: string) => {
      if (!voiceEnabled || typeof window === "undefined" || !("speechSynthesis" in window)) return;

      const spokenText = text
        .replace(/\*\*/g, "")
        .replace(/[`*_#]/g, "")
        .replace(/\s+/g, " ")
        .trim();

      if (!spokenText) return;

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(spokenText);
      utterance.lang = "id-ID";
      utterance.rate = 0.95;
      utterance.pitch = 1;
      window.speechSynthesis.speak(utterance);
    },
    [voiceEnabled],
  );

  const value = useMemo(
    () => ({ theme, voiceEnabled, setTheme, setVoiceEnabled, speak }),
    [theme, voiceEnabled, setTheme, setVoiceEnabled, speak],
  );

  return (
    <AppPreferencesContext.Provider value={value}>
      {children}
    </AppPreferencesContext.Provider>
  );
}

export function AppPreferences() {
  const { theme, voiceEnabled, setTheme, setVoiceEnabled } = useAppPreferences();
  const isLight = theme === "light";

  return (
    <div
      className="app-preferences fixed bottom-4 left-4 z-[9990] flex items-center rounded-full border border-neutral-700/80 bg-neutral-900/90 px-2 py-1.5 text-white shadow-xl shadow-black/20 backdrop-blur-md transition-colors"
      data-testid="app-preferences"
    >
      <div className="flex items-center gap-1.5" title={isLight ? "Beralih ke mode gelap" : "Beralih ke mode terang"}>
        {isLight ? <Sun className="h-4 w-4 text-amber-300" aria-hidden="true" /> : <Moon className="h-4 w-4 text-blue-200" aria-hidden="true" />}
        <Switch
          checked={isLight}
          onCheckedChange={(checked) => setTheme(checked ? "light" : "dark")}
          aria-label={isLight ? "Gunakan tema gelap" : "Gunakan tema terang"}
          data-testid="theme-toggle"
        />
        <span className="hidden text-xs font-medium sm:inline">{isLight ? "Terang" : "Gelap"}</span>
      </div>

      <span className="mx-2 h-5 w-px bg-neutral-700" aria-hidden="true" />

      <div className="flex items-center gap-1.5" title={voiceEnabled ? "Matikan voice assistant" : "Nyalakan voice assistant"}>
        {voiceEnabled ? <Volume2 className="h-4 w-4 text-emerald-300" aria-hidden="true" /> : <VolumeX className="h-4 w-4 text-neutral-400" aria-hidden="true" />}
        <Switch
          checked={voiceEnabled}
          onCheckedChange={setVoiceEnabled}
          aria-label={voiceEnabled ? "Matikan voice assistant" : "Nyalakan voice assistant"}
          data-testid="voice-toggle"
        />
        <span className="hidden text-xs font-medium sm:inline">{voiceEnabled ? "Voice ON" : "Voice OFF"}</span>
      </div>
    </div>
  );
}