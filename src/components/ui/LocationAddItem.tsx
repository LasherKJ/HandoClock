import { Colors } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-resolved-color-scheme";
import { getTimeForTimezone } from "@/utils/TimeFormatter";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
// eslint-disable-next-line @typescript-eslint/no-require-imports
const tzLookup = require("tz-lookup") as (lat: string, lon: string) => string;

type result = {
  place_id: string;
  display_name: string;
  name: string;
  lat: string;
  lon: string;
};

type location = {
  place_id: string;
  display_name: string;
  timeZone: string;
  name: string;
  lat: string;
  lon: string;
};

type LocationAddItemProps = {
  result: result;
  clearSearch: () => void;
  setSelectedLocation: (location: location) => void;
};

export const LocationAddItem = ({
  result,
  clearSearch,
  setSelectedLocation,
}: LocationAddItemProps) => {
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const timeZone = tzLookup(result.lat, result.lon);

  const [calculatedTime, setCalculatedTime] = useState<string>(
    getTimeForTimezone(timeZone, "en-US"),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCalculatedTime(getTimeForTimezone(timeZone, "en-US"));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  const handlePress = () => {
    setSelectedLocation({
      place_id: result.place_id,
      display_name: result.name,
      timeZone: timeZone,
      name: result.name,
      lat: result.lat,
      lon: result.lon,
    });
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
      <ThemedText type="smallBold" style={styles.name}>
        {result.display_name}
      </ThemedText>
      <ThemedText type="small">{calculatedTime}</ThemedText>
    </Pressable>
  );
};

const createStyles = (colors: typeof Colors.light | typeof Colors.dark) =>
  StyleSheet.create({
    locationResult: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 10,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.text,
      gap: 8,
    },
    pressed: {
      backgroundColor: colors.backgroundSelected,
    },
    name: {
      flex: 1,
    },
  });
