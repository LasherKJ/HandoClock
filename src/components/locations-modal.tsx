import { Colors, Spacing } from "@/constants/theme";
import { LocationSearch } from "@/utils/LocationSearch";
import * as React from "react";
import { useEffect } from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  TextInput,
  useColorScheme,
} from "react-native";
import { ThemedText } from "./themed-text";
import { LocationAddItem } from "./ui/LocationAddItem";

type SearchResult = {
  id: string;
  displayName: {
    text: string;
  };
  timeZone?: {
    id: string;
  };
};

export function LocationsModal({
  visible,
  setVisible,
}: {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}) {
  const [searchResults, setSearchResults] = React.useState<SearchResult[]>([]);
  const scheme = useColorScheme();
  const colors = Colors[scheme === "unspecified" ? "light" : scheme];
  const styles = createStyles(colors);
  const [locationName, setLocationName] = React.useState("");

  const getLocationList = async () => {
    const results = await LocationSearch(locationName);
    setSearchResults(results);
  };

  useEffect(() => {
    if (locationName.trim().length < 2) {
      return;
    }
    const timeOut = setTimeout(() => {
      getLocationList();
    }, 300);

    return () => clearTimeout(timeOut);
  }, [locationName]);

  const clearSearch = () => {
    setVisible(false);
    setLocationName("");
    setSearchResults([]);
  };
  return (
    <Modal
      visible={visible}
      onRequestClose={() => setVisible(false)}
      animationType="slide"
      transparent={true}
    >
      <Pressable style={styles.modalWrapper} onPress={() => setVisible(false)}>
        <Pressable
          style={styles.modalContainer}
          onPress={(e) => e.stopPropagation()}
        >
          <ThemedText type="subtitle" style={styles.title}>
            Add a New Location
          </ThemedText>
          <TextInput
            style={styles.input}
            placeholder="Enter location name"
            value={locationName}
            onChange={(e) => setLocationName(e.nativeEvent.text)}
          />
          {searchResults.map((result) => {
            return (
              <LocationAddItem
                key={result.id}
                result={result}
                clearSearch={clearSearch}
              />
            );
          })}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const createStyles = (colors: typeof Colors.light | typeof Colors.dark) =>
  StyleSheet.create({
    modalWrapper: {
      flex: 1,
      justifyContent: "flex-end",
      alignItems: "center",
    },
    modalContainer: {
      width: "100%",
      height: "75%",
      backgroundColor: colors.backgroundElement,
      borderRadius: Spacing.four,
      padding: 20,
      gap: Spacing.three,
    },
    title: {
      textAlign: "center",
    },
    input: {
      color: colors.text,
      padding: Spacing.two,
      borderRadius: Spacing.two,
      boxShadow:
        "-1px -1px 1px rgba(0,0,0,0.25), 1px 1px 1px rgba(100,100,100,0.7)",
    },
    locationResult: {
      flexDirection: "row",
      justifyContent: "space-between",
      padding: Spacing.two,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: colors.text,
    },
  });
