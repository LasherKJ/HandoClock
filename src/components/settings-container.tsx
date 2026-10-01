import { Colors, Spacing } from "@/constants/theme";
import { useThemeColors } from "@/hooks/use-resolved-color-scheme";
import { useSettingsStore } from "@/hooks/use-settings-store";
import { StyleSheet, Switch, View } from "react-native";
import { ThemedText } from "./themed-text";
import { HorizontalRule } from "./ui/HorizontalRule";
import { RadioOption } from "./ui/RadioOption";

export function SettingsContainer() {
  const themeValue = useSettingsStore((state) => state.theme);
  const updateTheme = useSettingsStore((state) => state.setTheme);
  const colors = useThemeColors();
  const styles = createStyles(colors);
  return (
    <View>
      <View style={styles.inputContainer}>
        <View style={styles.radioButtonGroup}>
          <RadioOption
            selected={themeValue === "light"}
            label="Light"
            onPress={() => {
              updateTheme("light");
            }}
          />
          <RadioOption
            selected={themeValue === "dark"}
            label="Dark"
            onPress={() => {
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
              updateTheme(value ? "automatic" : "light");
            }}
            trackColor={colors.switchTrackColor}
            ios_backgroundColor={colors.iosSwitchBackgroundColor}
          />
        </View>
      </View>
    </View>
  );
}

const createStyles = (colors: typeof Colors.light | typeof Colors.dark) =>
  StyleSheet.create({
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
