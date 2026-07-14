import { useTheme } from "@/hooks/use-theme";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";

export type RadioOptionProps = {
  selected: boolean;
  label: string;
  onPress: () => void;
};

export function RadioOption({ selected, label, onPress }: RadioOptionProps) {
  const theme = useTheme();
  const defaultColor = theme.textSecondary;
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <ThemedText type="smallBold">{label}</ThemedText>
      <SymbolView
        name={{ ios: selected ? "checkmark.circle.fill" : "circle" }}
        size={20}
        tintColor={selected ? "#0000FF" : defaultColor}
      />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
  },
  circle: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
  },
  selected: {
    borderColor: "blue",
    backgroundColor: "blue",
  },
});
