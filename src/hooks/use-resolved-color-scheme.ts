import { Colors } from "@/constants/theme";
import { useColorScheme } from "@/hooks/use-color-scheme.web";
import { useSettingsStore } from "@/hooks/use-settings-store";

export function useThemeColors() {
  const themeValue = useSettingsStore((state) => state.theme);
  const scheme = useColorScheme();

  const resolvedTheme: keyof typeof Colors =
    themeValue === "automatic"
      ? scheme === "dark"
        ? "dark"
        : "light"
      : themeValue;

  return Colors[resolvedTheme];
}
