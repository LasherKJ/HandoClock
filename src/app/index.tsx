import { initializeWidgetConfig } from "@/utils/InitializeWidgetConfig";
import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LocationsContainer } from "@/components/locations-container";
import { PreviewWindow } from "@/components/Preview/preview-window";
import { SettingsContainer } from "@/components/settings-container";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";
import { useEffect } from "react";

export default function HomeScreen() {
  useEffect(() => {
    initializeWidgetConfig();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <SafeAreaView style={styles.safeArea}>
        <ThemedView style={styles.heroSection}>
          <ThemedText type="title" style={styles.title}>
            Hando Clock
          </ThemedText>
        </ThemedView>
        <ThemedView type="backgroundElement" style={styles.stepContainer}>
          <SettingsContainer />
          <LocationsContainer />
        </ThemedView>
        <PreviewWindow />
      </SafeAreaView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: Spacing.four,
    alignItems: "center",
    gap: Spacing.three,
    maxWidth: MaxContentWidth,
  },
  heroSection: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: Spacing.four,
    gap: Spacing.four,
  },
  title: {
    textAlign: "center",
  },
  stepContainer: {
    flex: 1,
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.three,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
    boxShadow: [
      {
        offsetX: 1,
        offsetY: 1,
        blurRadius: 1,
        color: "rgba(0,0,0,0.25)",
      },
      {
        offsetX: -1,
        offsetY: -1,
        blurRadius: 1,
        color: "rgba(100, 100, 100, 0.7)",
      },
    ],
  },
});
