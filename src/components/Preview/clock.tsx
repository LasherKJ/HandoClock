import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useLocationStore } from "@/hooks/use-location-store";
import { useThemeColors } from "@/hooks/use-resolved-color-scheme";
import { StyleSheet, Text } from "react-native";

const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

export function Clock() {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const locations = useLocationStore((state) => state.locations);
  return (
    <ThemedView style={styles.face}>
      {numbers.map((number) => {
        const angle = (number / 12) * 2 * Math.PI;

        return (
          <Text
            key={number}
            style={[
              styles.number,
              {
                left: `${50 + 40 * Math.sin(angle)}%`,
                top: `${50 - 40 * Math.cos(angle)}%`,
              },
            ]}
          >
            {number}
          </Text>
        );
      })}
    </ThemedView>
  );
}

const createStyles = (colors: typeof Colors.light | typeof Colors.dark) =>
  StyleSheet.create({
    face: {
      justifyContent: "center",
      alignSelf: "center",
      borderRadius: 10000,
      aspectRatio: 1,
      width: "100%",
    },
    number: {
      color: colors.textSecondary,
      position: "absolute",
      width: 24,
      height: 24,
      textAlign: "center",
      textAlignVertical: "center",
      marginLeft: -12,
      marginTop: -12,
    },
  });
