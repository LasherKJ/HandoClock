import { Colors } from "@/constants/theme";
import { useLocationStore } from "@/hooks/use-location-store";
import { useThemeColors } from "@/hooks/use-resolved-color-scheme";
import { getTimeForTimezone } from "@/utils/TimeFormatter";
import { useEffect, useState } from "react";
import { Pressable, StyleSheet } from "react-native";
import { ThemedText } from "../themed-text";
import { ColorPickerModal } from "./color-picker/ColorPickerModal";
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
  const colors = useThemeColors();
  const styles = createStyles(colors);
  const addLocation = useLocationStore((state) => state.addLocation);
  const timeZone = tzLookup(result.lat, result.lon);
  const [colorPickerVisible, setColorPickerVisible] = useState(false);

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
    setColorPickerVisible(true);
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
      <ColorPickerModal
        visible={colorPickerVisible}
        onClose={() => setColorPickerVisible(false)}
        location={{ ...result, timeZone }}
        clearSearch={clearSearch}
      />
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
