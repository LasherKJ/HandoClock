import { Colors } from "@/constants/theme";
import { useLocationStore } from "@/hooks/use-location-store";
import { getTimeForTimezone } from "@/utils/TimeFormatter";
import * as React from "react";
import { useEffect } from "react";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
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

  const [calculatedTime, setCalculatedTime] = React.useState<string>(
    getTimeForTimezone(timeZone, "en-US"),
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCalculatedTime(getTimeForTimezone(timeZone, "en-US"));
    }, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  const handlePress = () => {
    addLocation({
      id: result.place_id,
      name: result.name,
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
