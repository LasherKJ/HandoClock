import { ThemedView } from "@/components/themed-view";
import { StyleSheet, Text } from "react-native";

const numbers = Array.from({ length: 12 }, (_, i) => i + 1);

export function Clock() {
  return (
    <ThemedView style={styles.face}>
      {numbers.map((number) => {
        const angle = (number / 12) * 2 * Math.PI;

        return (
          <Text
            key={number}
            style={[
              styles.number,
              {
                left: `${50 + 42 * Math.sin(angle)}%`,
                top: `${50 - 42 * Math.cos(angle)}%`,
              },
            ]}
          >
            {number}
          </Text>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  face: {
    borderWidth: 1,
    justifyContent: "center",
    alignSelf: "center",
    borderRadius: 10000,
    aspectRatio: 1,
    width: "100%",
  },
  number: {
    color: "white",
    position: "absolute",
    transform: [{ translateX: -5 }, { translateY: -10 }],
  },
});
