import { ThemedView } from "@/components/themed-view";
import { Colors } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-resolved-color-scheme";
import { StyleSheet, Text } from "react-native";
import { HourHand } from "./hour-hand";
import { MinuteHand } from "./minute-hand";

const numbers = Array.from({ length: 12 }, (_, i) => i + 1);
type LocationObject = {
  id: string;
  name: string;
  timeZone?: string;
  color?: string;
  enabled?: boolean;
};

export function Clock({
  locations,
  showCurrentLocation,
}: {
  locations: LocationObject[];
  showCurrentLocation: boolean;
}) {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const placeHolderColors = ["purple", "blue", "green", "yellow", "teal"];
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
      {showCurrentLocation && <HourHand />}
      {Object.values(locations).map((hand, index) => (
        <HourHand
          key={hand.id}
          timeZone={hand.timeZone}
          color={placeHolderColors[index % placeHolderColors.length]}
        />
      ))}
      <MinuteHand />
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
      position: "relative",
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
