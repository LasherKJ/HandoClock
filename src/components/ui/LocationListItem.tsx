import { Spacing } from "@/constants/theme";
import * as React from "react";
import { StyleSheet, Switch, View } from "react-native";
import { ThemedText } from "../themed-text";

type LocationListItemProps = {
  label?: string;
  offset?: string;
  enabled?: boolean;
};
export function LocationListItem({
  label = "somewhere fun",
  offset,
  enabled,
}: LocationListItemProps) {
  const [derivedEnabled, setDerivedEnabled] = React.useState(enabled ?? false);
  return (
    <View style={styles.container}>
      <ThemedText style={styles.label} type="smallBold">
        {label}
      </ThemedText>
      {offset && (
        <ThemedText style={styles.offset} type="small">
          {offset}
        </ThemedText>
      )}
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
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
