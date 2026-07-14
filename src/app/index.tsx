import * as Device from "expo-device";
import { Platform, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { LocationsContainer } from "@/components/locations-container";
import { SettingsContainer } from "@/components/settings-container";
import { ThemedText } from "@/components/themed-text";
import { ThemedView } from "@/components/themed-view";
import { MaxContentWidth, Spacing } from "@/constants/theme";

function getDevMenuHint() {
  if (Platform.OS === "web") {
    return <ThemedText type="small">use browser devtools</ThemedText>;
  }
  if (Device.isDevice) {
    return (
      <ThemedText type="small">
        shake device or press <ThemedText type="code">m</ThemedText> in terminal
      </ThemedText>
    );
  }
  const shortcut = Platform.OS === "android" ? "cmd+m (or ctrl+m)" : "cmd+d";
  return (
    <ThemedText type="small">
      press <ThemedText type="code">{shortcut}</ThemedText>
    </ThemedText>
  );
}

export default function HomeScreen() {
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
        <ThemedView type="backgroundElement" style={styles.previewContainer}>
          <ThemedView
            type="backgroundElement"
            style={styles.widgetPreview}
          ></ThemedView>
        </ThemedView>
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
  previewContainer: {
    alignItems: "center",
  },
  widgetPreview: {
    backgroundColor: "red",
    width: "100%",
    maxWidth: 380,
    aspectRatio: 1.9,
    borderRadius: 28,
    overflow: "hidden",
  },
});
