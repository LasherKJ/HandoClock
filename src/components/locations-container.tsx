import { Spacing } from "@/constants/theme";
import { useLocationStore } from "@/hooks/use-location-store";
import { useTheme } from "@/hooks/use-theme";
import { ScrollView, StyleSheet, View } from "react-native";
import { LocationAddTrigger } from "./ui/LocationAddTrigger";
import { LocationListItem } from "./ui/LocationListItem";

export function LocationsContainer() {
  const scrollBackgroundColor = useTheme().backgroundElement;
  const savedLocations = useLocationStore((state) => state.locations);
  return (
    <View style={styles.wrapper}>
      <ScrollView
        style={[styles.container, { backgroundColor: scrollBackgroundColor }]}
      >
        <LocationListItem
          name="Your Location"
          key={"user-location"}
          id={"user-location"}
          enabled={useLocationStore((state) => state.showCurrentLocation)}
        />
        {savedLocations.map((location) => (
          <LocationListItem
            key={location.id}
            {...location}
            enabled={location.enabled ?? false}
          />
        ))}
      </ScrollView>
      <LocationAddTrigger />
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    borderRadius: Spacing.four,
    overflow: "hidden",
    boxShadow: [
      {
        inset: true,
        offsetX: 1,
        offsetY: 1,
        blurRadius: 1,
        color: "rgba(0,0,0,0.25)",
      },
      {
        inset: true,
        offsetX: -1,
        offsetY: -1,
        blurRadius: 1,
        color: "rgba(100, 100, 100, 0.7)",
      },
    ],
  },
  container: {
    flex: 1,
    gap: Spacing.three,
    alignSelf: "stretch",
  },
});
