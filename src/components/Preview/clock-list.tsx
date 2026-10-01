import { Colors, Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-resolved-color-scheme";
import { StyleSheet, View } from "react-native";
import { ThemedText } from "../themed-text";
import { ThemedView } from "../themed-view";
type LocationObject = {
  id: string;
  name: string;
  timeZone?: string;
  color?: string;
  enabled?: boolean;
};
export function ClockList({ locations }: { locations: LocationObject[] }) {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  return (
    <ThemedView style={styles.listContainer}>
      <ThemedView style={styles.listShim}>
        {locations.map((location) => (
          <View style={styles.row} key={location.id}>
            <ThemedText
              numberOfLines={1}
              ellipsizeMode="tail"
              style={styles.text}
            >
              {location.name}
            </ThemedText>
            <View style={styles.dot}></View>
          </View>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const createStyles = (colors: typeof Colors.light | typeof Colors.dark) =>
  StyleSheet.create({
    listContainer: {
      flex: 1,
      margin: Spacing.two,
      marginLeft: Spacing.one,
      padding: Spacing.two,
      borderRadius: Spacing.two,
    },
    listShim: {
      width: "100%",
    },
    row: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    text: {
      color: colors.textSecondary,
      fontSize: 12,
      flex: 1,
      minWidth: 0,
    },
    dot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.textSecondary,
      marginLeft: 8,
    },
  });
