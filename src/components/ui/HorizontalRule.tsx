import { useTheme } from "@/hooks/use-theme";
import { StyleSheet } from "react-native";
import { ThemedView } from "../themed-view";

export function HorizontalRule() {
  const theme = useTheme();
  return (
    <ThemedView
      style={[styles.horizontalRule, { borderColor: theme.backgroundSelected }]}
    />
  );
}

const styles = StyleSheet.create({
  horizontalRule: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 8,
  },
});
