import { Spacing } from "@/constants/theme";
import { useLocationStore } from "@/hooks/use-location-store";
import { useTheme } from "@/hooks/use-theme";
import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { EditModal } from "./ui/EditModal";
import { LocationAddTrigger } from "./ui/LocationAddTrigger";
import { LocationListItem } from "./ui/LocationListItem";

export function LocationsContainer() {
  const scrollBackgroundColor = useTheme().backgroundElement;
  const savedLocations = useLocationStore((state) => state.locations);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [locationToEdit, setLocationToEdit] = useState<string | null>(null);

  const handleLongPress = (key: string) => {
    setLocationToEdit(key);
    setEditModalVisible(true);
  };

  const handleDeleteLocation = (id: string) => {
    useLocationStore.getState().removeLocation(id);
    setEditModalVisible(false);
  };

  return (
    <View style={styles.wrapper}>
      <EditModal
        visible={editModalVisible}
        setVisible={setEditModalVisible}
        locationId={locationToEdit}
        handleDeleteLocation={handleDeleteLocation}
      />
      <ScrollView
        style={[styles.container, { backgroundColor: scrollBackgroundColor }]}
      >
        <LocationListItem
          name="Your Location"
          key={"user-location"}
          id={"user-location"}
          enabled={useLocationStore((state) => state.showCurrentLocation)}
          handleLongPress={handleLongPress}
        />
        {savedLocations.map((location) => (
          <LocationListItem
            key={location.id}
            {...location}
            enabled={location.enabled ?? false}
            handleLongPress={handleLongPress}
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
