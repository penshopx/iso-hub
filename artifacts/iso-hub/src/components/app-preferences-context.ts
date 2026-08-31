import { createContext, useContext } from "react";

export type Theme = "dark" | "light";

export type AppPreferencesContextValue = {
  theme: Theme;
  voiceEnabled: boolean;
  setTheme: (theme: Theme) => void;
  setVoiceEnabled: (enabled: boolean) => void;
  speak: (text: string) => void;
};

export const AppPreferencesContext =
  createContext<AppPreferencesContextValue | null>(null);

export function useAppPreferences() {
  const context = useContext(AppPreferencesContext);
  if (!context) {
    throw new Error("useAppPreferences must be used within AppPreferencesProvider");
  }
  return context;
}