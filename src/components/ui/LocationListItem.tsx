import { Colors, Spacing } from "@/constants/theme";
import { getTimeForTimezone } from "@/utils/TimeFormatter";
import * as React from "react";
import { useEffect } from "react";
import { StyleSheet, Switch, View, useColorScheme } from "react-native";
import { ThemedText } from "../themed-text";

type LocationListItemProps = {
  name?: string;
  offset?: string;
  enabled?: boolean;
  color?: string;
  timeZone?: string;
};
export function LocationListItem({
  name = "somewhere fun",
  enabled,
  timeZone,
  color,
}: LocationListItemProps) {
  const [derivedEnabled, setDerivedEnabled] = React.useState(enabled ?? false);
  const [calculatedTime, setCalculatedTime] = React.useState<string>(
    timeZone
      ? getTimeForTimezone(timeZone, "en-US")
      : new Date().toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }),
  );
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];
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
          onValueChange={setDerivedEnabled}
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
