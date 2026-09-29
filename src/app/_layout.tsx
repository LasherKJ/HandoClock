import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect } from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { useResolvedColorScheme, useTheme } from "@/hooks/use-theme";

export default function RootLayout() {
  const theme = useTheme();
  const scheme = useResolvedColorScheme();

  // Keep the native root view (behind the safe areas) in sync with the theme.
  useEffect(() => {
    SystemUI.setBackgroundColorAsync(theme.background);
  }, [theme.background]);

  return (
    <SafeAreaProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          contentStyle: { backgroundColor: theme.background },
        }}
      />
      <StatusBar style={scheme === "dark" ? "light" : "dark"} />
    </SafeAreaProvider>
  );
}
