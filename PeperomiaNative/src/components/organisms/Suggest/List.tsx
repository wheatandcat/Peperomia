import React from "react";
import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { IconImage } from "primitive";
import { SuggestItem, uniqueSuggests } from "../../../lib/suggest";
import { KINDS } from "../../../lib/getKind";
import theme, { darkMode } from "../../../config/theme";

interface Props {
  title: string;
  items: SuggestItem[];
  onPress: (kind: string, name: string) => void;
}

export default (props: Props) => (
  <View style={styles.root}>
    {uniqueSuggests(props.items)
      .filter(item => {
        if (!props.title) {
          return true;
        }
        return item.title.includes(props.title);
      })
      .slice(0, 8)
      .map(item => (
        <TouchableOpacity
          style={{ paddingVertical: 15 }}
          onPress={() => props.onPress(item.kind, item.title)}
          key={item.title}
        >
          <View
            style={{ flexDirection: "row", height: 30, alignItems: "center" }}
          >
            <View style={{ alignItems: "center" }}>
              <IconImage
                src={getImageSrc(item.kind, darkMode())}
                name=""
                size={25}
                opacity={1.0}
              />
            </View>
            <View
              style={{
                marginLeft: 4,
                borderLeftWidth: 6,
                borderColor: getImageColor(item.kind),
                paddingLeft: 10
              }}
            >
              <Text style={styles.title}>{item.title}</Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
  </View>
);

const getImageSrc = (kind: string, reversal?: boolean) => {
  const item = KINDS[kind];

  if (reversal) {
    return item.reversal.src;
  }

  return item.src;
};

const getImageColor = (kind: string) => {
  const item = KINDS[kind];

  return item.backgroundColor;
};

const styles = StyleSheet.create({
  root: {
    padding: 20,
    backgroundColor: theme.mode.background
  },
  title: {
    color: theme.mode.text
  }
});
