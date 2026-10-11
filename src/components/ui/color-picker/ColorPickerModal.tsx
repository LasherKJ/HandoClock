import { ThemedText } from "@/components/themed-text";
import { useLocationStore } from "@/hooks/use-location-store";
import { useThemeColors } from "@/hooks/use-resolved-color-scheme";
import { Modal, Pressable, StyleSheet, View } from "react-native";

const ColorArray = [
  "#E63946", // Red
  "#F77F00", // Orange
  "#F2C14E", // Gold
  "#2A9D8F", // Teal
  "#00A896", // Emerald
  "#2D7DD2", // Blue
  "#4361EE", // Indigo
  "#7209B7", // Purple
  "#B5179E", // Magenta
  "#D62828", // Crimson
  "#6A994E", // Green
  "#9C6644", // Brown
];

type result = {
  place_id: string;
  display_name: string;
  name: string;
  lat: string;
  lon: string;
  timeZone: string;
};

export const ColorPickerModal = ({
  visible,
  location,
  onClose,
  clearSearch,
}: {
  visible: boolean;
  location: result;
  onClose: () => void;
  clearSearch: () => void;
}) => {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const addLocation = useLocationStore((state) => state.addLocation);
  const handlePress = (color: string) => {
    alert(location);
    addLocation({
      id: location.place_id,
      name: location.name,
      timeZone: location.timeZone,
      color: color,
      enabled: true,
    });
    clearSearch();
    onClose();
  };
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
          <ThemedText>Select a color</ThemedText>
          <View style={styles.colorGrid}>
            {ColorArray.map((color) => (
              <Pressable
                key={color}
                style={[styles.dot, { backgroundColor: color }]}
                onPress={() => handlePress(color)}
              />
            ))}
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};
const createStyles = (colors: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(34, 34, 34, 0.6)",
      justifyContent: "center",
      alignItems: "center",
    },

    modal: {
      width: 250,
      padding: 20,
      borderRadius: 12,
      backgroundColor: colors.background,
    },
    colorGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      marginTop: 10,
    },
    dot: {
      width: 20,
      height: 20,
      margin: 7,
      borderRadius: 10,
    },
  });
