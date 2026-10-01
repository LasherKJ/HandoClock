import { Colors } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-resolved-color-scheme";
import * as React from "react";
import { Pressable, StyleSheet } from "react-native";
import { LocationsModal } from "../locations-modal";
import { ThemedText } from "../themed-text";

export function LocationAddTrigger() {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const [visible, setVisible] = React.useState(false);

  return (
    <Pressable
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}
      onPress={() => setVisible(true)}
    >
      <ThemedText type="small" style={styles.text}>
        + Add Location
      </ThemedText>
      <LocationsModal visible={visible} setVisible={setVisible} />
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
