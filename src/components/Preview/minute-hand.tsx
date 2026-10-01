import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export function MinuteHand() {
  const [degrees, setDegrees] = useState(
    new Date().getMinutes() * 6 + new Date().getSeconds() * 0.1,
  );

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const degrees = now.getMinutes() * 6 + now.getSeconds() * 0.1;
      setDegrees(degrees);
    };

    update();

    const interval = setInterval(update, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.hand,
          {
            transform: [{ rotate: `${degrees}deg` }],
          },
        ]}
      />
      <View
        style={[
          styles.tail,
          {
            transform: [{ rotate: `${degrees}deg` }],
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    width: "100%",
    height: "100%",
  },
  hand: {
    position: "absolute",
    width: 2,
    height: "44%",
    left: "50%",
    bottom: "50%",
    backgroundColor: "red",
    transformOrigin: "bottom",
  },
  tail: {
    position: "absolute",
    width: 2,
    height: "3%",
    left: "50%",
    bottom: "47%",
    backgroundColor: "red",
    transformOrigin: "top",
  },
});
