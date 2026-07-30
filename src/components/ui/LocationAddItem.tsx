import { Colors } from "@/constants/theme";
import { useLocationStore } from "@/hooks/use-location-store";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { ThemedText } from "../themed-text";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const tzLookup = require("tz-lookup") as (lat: string, lon: string) => string;

type result = {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
};

type LocationAddItemProps = {
  result: result;
  clearSearch: () => void;
};

export const LocationAddItem = ({
  result,
  clearSearch,
}: LocationAddItemProps) => {
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];
  const styles = createStyles(colors);
  const addLocation = useLocationStore((state) => state.addLocation);
  const timeZone = tzLookup(result.lat, result.lon);
  const handlePress = () => {
    addLocation({
      id: result.place_id,
      name: result.display_name,
      timeZone: timeZone,
      color: "red",
      enabled: true,
    });
    clearSearch();
  };
  return (
    <Pressable
      key={result.place_id}
      style={({ pressed }) => [
        styles.locationResult,
        pressed && styles.pressed,
      ]}
      onPress={handlePress}
    >
      <ThemedText type="smallBold">{result.display_name}</ThemedText>
      <ThemedText type="small">{timeZone}</ThemedText>
    </Pressable>
  );
};

const createStyles = (colors: typeof Colors.light | typeof Colors.dark) =>
  StyleSheet.create({
    locationResult: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.text,
    },
    pressed: {
      backgroundColor: colors.backgroundSelected,
    },
  });
