import { Colors, Spacing } from "@/constants/theme";
import * as React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";
import { ThemedText } from "../themed-text";

export function LocationAddTrigger() {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];
  const styles = createStyles(colors);
  const [visible, setVisible] = React.useState(false);

  return (
    <Pressable
      style={({ pressed }) => [styles.wrapper, pressed && styles.pressed]}
      onPress={() => setVisible(true)}
    >
      <Modal
        visible={visible}
        onRequestClose={() => setVisible(false)}
        animationType="slide"
        transparent={true}
      >
        <Pressable
          style={styles.modalWrapper}
          onPress={() => setVisible(false)}
        >
          <Pressable
            style={styles.modalContainer}
            onPress={(e) => e.stopPropagation()}
          >
            <ThemedText type="subtitle" style={styles.title}>
              Add a New Location
            </ThemedText>
            <TextInput style={styles.input} placeholder="Enter location name" />
          </Pressable>
        </Pressable>
      </Modal>
      <ThemedText type="small" style={styles.text}>
        + Add Location
      </ThemedText>
    </Pressable>
  );
}

const createStyles = (colors: typeof Colors.light | typeof Colors.dark) =>
  StyleSheet.create({
    modalWrapper: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    modalContainer: {
      width: "100%",
      height: "75%",
      backgroundColor: colors.backgroundElement,
      borderRadius: Spacing.four,
      padding: 20,
      gap: Spacing.three,
    },
    title: {
      textAlign: "center",
    },
    input: {
      padding: Spacing.two,
      borderRadius: Spacing.two,
      boxShadow:
        "-1px -1px 1px rgba(0,0,0,0.25), 1px 1px 1px rgba(100,100,100,0.7)",
    },
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
