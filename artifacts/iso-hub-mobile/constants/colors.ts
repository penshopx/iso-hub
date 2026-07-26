/**
 * ISO Hub Mobile — design tokens synced from the sibling iso-hub web artifact.
 * Web uses a dark-first palette (neutral-900 bg, blue-500 primary).
 */

const colors = {
  light: {
    text: '#0a0a0a',
    tint: '#3b82f6',
    background: '#f5f5f5',
    foreground: '#0a0a0a',
    card: '#ffffff',
    cardForeground: '#0a0a0a',
    primary: '#3b82f6',
    primaryForeground: '#ffffff',
    secondary: '#e5e7eb',
    secondaryForeground: '#1a1a1a',
    muted: '#f0f0f0',
    mutedForeground: '#737373',
    accent: '#8b5cf6',
    accentForeground: '#ffffff',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    border: '#e5e5e5',
    input: '#e5e5e5',
  },
  dark: {
    text: '#ffffff',
    tint: '#3b82f6',
    background: '#171717',   // neutral-900
    foreground: '#ffffff',
    card: '#262626',         // neutral-800
    cardForeground: '#ffffff',
    primary: '#3b82f6',      // blue-500
    primaryForeground: '#ffffff',
    secondary: '#262626',    // neutral-800
    secondaryForeground: '#ffffff',
    muted: '#404040',        // neutral-700
    mutedForeground: '#a3a3a3', // neutral-400
    accent: '#8b5cf6',       // purple-500
    accentForeground: '#ffffff',
    destructive: '#ef4444',
    destructiveForeground: '#ffffff',
    border: '#404040',       // neutral-700
    input: '#404040',
  },
  radius: 8,
};

export default colors;
