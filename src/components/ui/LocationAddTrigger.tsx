import { Colors } from "@/constants/theme";
import { useLocationStore } from "@/hooks/use-location-store";
import { useThemeColors } from "@/hooks/use-resolved-color-scheme";
import { useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { LocationsModal } from "../locations-modal";
import { ThemedText } from "../themed-text";
import { ColorPickerModal } from "./color-picker/ColorPickerModal";

type location = {
  place_id: string;
  display_name: string;
  timeZone: string;
  name: string;
  lat: string;
  lon: string;
};

export function LocationAddTrigger() {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const [locationVisible, setLocationVisible] = useState(false);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<location | null>(null);
  const addLocation = useLocationStore((state) => state.addLocation);

  const handleSelectLocation = (location: location) => {
    setSelectedLocation(location);
    setColorPickerVisible(true);
    setLocationVisible(false);
  }
  const handleAddLocation = (color: string) => {
    setColorPickerVisible(false);
    if (selectedLocation) {
      addLocation({
        id: selectedLocation.place_id,
        name: selectedLocation.name,
        timeZone: selectedLocation.timeZone,
        color: color,
        enabled: true,
      });
    setLocationVisible(false);
  }
}

  return (
    <Pressable
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}
      onPress={() => setLocationVisible(true)}
    >
      <ColorPickerModal 
        visible={colorPickerVisible}
        onClose={() => setColorPickerVisible(false)} 
        handleAddLocation={handleAddLocation}
      />
      <ThemedText type="small" style={styles.text}>
        + Add Location
      </ThemedText>
      <LocationsModal 
        visible={locationVisible} 
        setVisible={setLocationVisible}
        setSelectedLocation={handleSelectLocation}
      />
    </Pressable>
  );
}

const createStyles = (colors: typeof Colors.light | typeof Colors.dark) =>
  StyleSheet.create({
    wrapper: {
      height: 48,
      justifyContent: "center",
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
      backgroundColor: colors.backgroundElement,
    },
    pressed: {
      backgroundColor: colors.backgroundSelected,
    },
    text: {
      textAlign: "center",
    },
  });
