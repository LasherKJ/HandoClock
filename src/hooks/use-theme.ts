/**
 * Learn more about light and dark modes:
 * https://docs.expo.dev/guides/color-schemes/
 */

import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { useSettingsStore } from "./use-settings-store";

export function useResolvedColorScheme() {
  const scheme = useColorScheme();
  const settingsTheme = useSettingsStore((state) => state.theme);
  return settingsTheme === "automatic"
    ? scheme === "dark"
      ? "dark"
      : "light"
    : settingsTheme;
}

export function useTheme() {
  return Colors[useResolvedColorScheme()];
}
