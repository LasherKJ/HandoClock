import { ThemedText } from "@/components/themed-text";
import { ColorArray } from "@/constants/colorArray";
import { useThemeColors } from "@/hooks/use-resolved-color-scheme";
import { Modal, Pressable, StyleSheet, View } from "react-native";

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
  onClose,
  handleAddLocation,
}: {
  visible: boolean;
  onClose: () => void;
  handleAddLocation: (color: number) => void;
}) => {
  const colors = useThemeColors();
  const styles = createStyles(colors);

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
            {ColorArray.map((color, i) => (
              <Pressable
                key={color}
                style={[styles.dot, { backgroundColor: color }]}
                onPress={() => handleAddLocation(i)}
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
