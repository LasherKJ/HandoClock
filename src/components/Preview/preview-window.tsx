import { ThemedView } from "@/components/themed-view";
import { Spacing } from "@/constants/theme";
import { useLocationStore } from "@/hooks/use-location-store";
import { StyleSheet } from "react-native";
import { Clock } from "./clock";
import { ClockList } from "./clock-list";

export function PreviewWindow() {
  const locations = useLocationStore((state) => state.locations);
  const showCurrentLocation = useLocationStore(
    (state) => state.showCurrentLocation,
  );
  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <ThemedView type="backgroundElement" style={styles.clockContainer}>
        <Clock
          locations={locations}
          showCurrentLocation={showCurrentLocation}
        />
      </ThemedView>
      <ThemedView type="backgroundElement" style={styles.listContainer}>
        <ClockList locations={locations} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    width: "100%",
    maxWidth: 380,
    aspectRatio: 1.9,
    borderRadius: 28,
    overflow: "hidden",
    flexDirection: "row",
    padding: Spacing.one,
    gap: Spacing.one,
  },
  clockContainer: {
    flex: 5,
    height: "100%",
    justifyContent: "center",
  },
  listContainer: {
    height: "100%",
    flex: 6,
  },
});
