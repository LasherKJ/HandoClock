import { Spacing } from "@/constants/theme";
import { useSettingsStore } from "@/hooks/use-settings-store";
import * as React from "react";
import { StyleSheet, Switch, View } from "react-native";
import { ThemedText } from "./themed-text";
import { HorizontalRule } from "./ui/HorizontalRule";
import { RadioOption } from "./ui/RadioOption";

export function SettingsContainer() {
  const [themeValue, setThemeValue] = React.useState(
    useSettingsStore((state) => state.theme),
  );
  const updateTheme = useSettingsStore((state) => state.setTheme);
  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.radioButtonGroup}>
          <RadioOption
            selected={themeValue === "light"}
            label="Light"
            onPress={() => {
              setThemeValue("light");
              updateTheme("light");
            }}
          />
          <RadioOption
            selected={themeValue === "dark"}
            label="Dark"
            onPress={() => {
              setThemeValue("dark");
              updateTheme("dark");
            }}
          />
        </View>
        <HorizontalRule />
        <View style={styles.toggleContainer}>
          <ThemedText type="smallBold">Automatic</ThemedText>
          <Switch
            value={themeValue === "automatic"}
            onValueChange={(value) => {
              setThemeValue(value ? "automatic" : "light");
              updateTheme(value ? "automatic" : "light");
            }}
            trackColor={{ true: "#0000FF" }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: Spacing.three,
    alignSelf: "stretch",
    paddingHorizontal: Spacing.five,
    paddingVertical: Spacing.four,
    borderRadius: Spacing.four,
  },
  inputContainer: {
    gap: Spacing.two,
    flexDirection: "column",
  },
  radioButtonGroup: {
    justifyContent: "space-around",
    flexDirection: "row",
  },
  toggleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: Spacing.four,
  },
});
