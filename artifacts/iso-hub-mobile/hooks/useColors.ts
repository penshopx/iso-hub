import { useColorScheme } from 'react-native';
import colors from '@/constants/colors';

type Palette = typeof colors.light;

/**
 * Returns the design tokens for the current color scheme.
 * Falls back to light palette when dark is not defined.
 */
export function useColors(): Palette & { radius: number } {
  const scheme = useColorScheme();
  const palette: Palette =
    scheme === 'dark' && 'dark' in colors
      ? (colors.dark as Palette)
      : colors.light;
  return { ...palette, radius: colors.radius };
}
