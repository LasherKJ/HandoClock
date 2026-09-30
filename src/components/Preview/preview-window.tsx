import { ThemedView } from "@/components/themed-view";
import { StyleSheet } from "react-native";
import { Clock } from "./clock";

export function PreviewWindow() {
  return (
    <ThemedView type="backgroundElement" style={styles.container}>
      <ThemedView type="backgroundElement" style={styles.clockContainer}>
        <Clock />
      </ThemedView>
      <ThemedView
        type="backgroundElement"
        style={styles.listContainer}
      ></ThemedView>
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
