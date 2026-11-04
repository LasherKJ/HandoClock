import { useLocationStore } from "@/hooks/use-location-store";
import { useThemeColors } from "@/hooks/use-resolved-color-scheme";
import { Modal, Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";

export function EditModal({
  visible,
  setVisible,
  locationId,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  locationId?: string | null;
}) {
    const colors = useThemeColors();
    const styles = createStyles(colors);
    const location = useLocationStore((state) => state.locations.find((loc) => loc.id === locationId));
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="fade"
      transparent
    >
      <Pressable style={styles.overlay} onPress={() => setVisible(false)}>
        <Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
          <ThemedText>Edit Modal</ThemedText>
          {location && (
            <>
              <ThemedText>Name: {location.name}</ThemedText>
              <ThemedText>Time Zone: {location.timeZone}</ThemedText>
              <ThemedText>Color: {location.color}</ThemedText>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  )
}

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
  })