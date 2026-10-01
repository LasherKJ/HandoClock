import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

export function HourHand({
  timeZone,
  color,
}: {
  timeZone?: string;
  color?: string;
}) {
  const styles = createStyles(color);
  const getClockDegrees = (timeZone?: string) => {
    if (!timeZone) {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      return (hour % 12) * 30 + minute * 0.5;
    }
    const parts = new Intl.DateTimeFormat("en-US", {
      timeZone,
      hour: "numeric",
      minute: "numeric",
      hour12: false,
    }).formatToParts(new Date());

    const hour = Number(parts.find((p) => p.type === "hour")?.value);
    const minute = Number(parts.find((p) => p.type === "minute")?.value);

    return (hour % 12) * 30 + minute * 0.5;
  };
  const [degrees, setDegrees] = useState(getClockDegrees(timeZone));

  useEffect(() => {
    const update = () => {
      setDegrees(getClockDegrees(timeZone));
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

const createStyles = (color?: string) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      width: "100%",
      height: "100%",
    },
    hand: {
      position: "absolute",
      width: 2,
      height: "27%",
      backgroundColor: color ?? "red",
      left: "50%",
      bottom: "50%",
      transformOrigin: "bottom",
    },
    tail: {
      transformOrigin: "top",
      position: "absolute",
      width: 2,
      height: "3%",
      left: "50%",
      bottom: "47%",
      backgroundColor: color ?? "red",
    },
  });
