import { Colors } from "@/constants/theme";
import { useLocationStore } from "@/hooks/use-location-store";
import { getTimeForTimezone } from "@/utils/TimeFormatter";
import { Pressable, StyleSheet, useColorScheme } from "react-native";
import { ThemedText } from "../themed-text";

type result = {
  id: string;
  displayName: {
    text: string;
  };
  timeZone?: {
    id: string;
  };
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
  const handlePress = () => {
    addLocation({
      id: result.id,
      name: result.displayName.text,
      timeZone: result.timeZone?.id ?? "UTC",
      color: "red",
      enabled: true,
    });
    clearSearch();
  };
  return (
    <Pressable
      key={result.id}
      style={({ pressed }) => [
        styles.locationResult,
        pressed && styles.pressed,
      ]}
      onPress={handlePress}
    >
      <ThemedText type="smallBold">{result.displayName.text}</ThemedText>
      <ThemedText type="small">
        {getTimeForTimezone(result.timeZone?.id ?? "UTC", "en-US")}
      </ThemedText>
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
