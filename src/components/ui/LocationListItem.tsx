import { Colors, Spacing } from "@/constants/theme";
import { useLocationStore } from "@/hooks/use-location-store";
import { useThemeColors } from "@/hooks/use-resolved-color-scheme";
import { getTimeForTimezone } from "@/utils/TimeFormatter";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { ThemedText } from "../themed-text";

type LocationListItemProps = {
  id: string;
  name?: string;
  offset?: string;
  enabled?: boolean;
  color?: string;
  timeZone?: string;
};
export function LocationListItem({
  name = "somewhere fun",
  id,
  enabled,
  timeZone,
  color,
}: LocationListItemProps) {
  const derivedEnabled = enabled ?? false;
  const [calculatedTime, setCalculatedTime] = React.useState<string>(
    timeZone
      ? getTimeForTimezone(timeZone, "en-US")
      : new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
  );
  const updateLocation = useLocationStore((state) => state.updateLocation);
  const colors = useThemeColors();

  const styles = createStyles(colors);
  useEffect(() => {
    const interval = setInterval(() => {
      setCalculatedTime(
        timeZone
          ? getTimeForTimezone(timeZone, "en-US")
          : new Date().toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "2-digit",
              hour12: true,
            }),
      );
    }, 1000);
    return () => clearInterval(interval);
  }, [timeZone]);

  const toggleShowCurrentLocation = useLocationStore(
    (state) => state.toggleShowCurrentLocation,
  );

  const toggleEnabled = () => {
    if (id === "user-location") {
      toggleShowCurrentLocation();
    } else {
      updateLocation({
        id: id,
        name,
        timeZone,
        color,
        enabled: !enabled,
      });
    }
  };

  return (
    <View style={styles.container}>
      <ThemedText style={styles.label} type="smallBold">
        {name}
      </ThemedText>
      <ThemedText style={styles.offset} type="small">
        {calculatedTime}
      </ThemedText>
      <View style={styles.switchContainer}>
        <Switch
          style={styles.switch}
          value={derivedEnabled}
          onValueChange={() => toggleEnabled()}
          trackColor={colors.switchTrackColor}
          ios_backgroundColor={colors.iosSwitchBackgroundColor}
        />
      </View>
    </View>
  );
}

const createStyles = (colors: typeof Colors.light | typeof Colors.dark) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.text,
      paddingHorizontal: Spacing.two,
    },
    label: {
      flex: 1,
    },
    offset: {
      textAlign: "right",
    },
    switchContainer: {
      alignItems: "flex-end",
    },
    switch: {
      transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
    },
  });
