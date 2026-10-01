import { useThemeColors } from "@/hooks/use-resolved-color-scheme";
import { SymbolView } from "expo-symbols";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";

export type RadioOptionProps = {
  selected: boolean;
  label: string;
  onPress: () => void;
};

export function RadioOption({ selected, label, onPress }: RadioOptionProps) {
  const colors = useThemeColors();
  const defaultColor = colors.textSecondary;
  const selectedColor = colors.switchTrackColor.true;
  return (
    <Pressable onPress={onPress} style={styles.row}>
      <ThemedText type="smallBold">{label}</ThemedText>
      <SymbolView
        name={{ ios: selected ? "checkmark.circle.fill" : "circle" }}
        size={20}
        tintColor={selected ? selectedColor : defaultColor}
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
});
