import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { SuggestItem, uniqueSuggests } from "../../../lib/suggest";
import { KINDS } from "../../../lib/getKind";
import theme from "../../../config/theme";
import { IconImage } from "../../atoms";

interface Props {
  title: string;
  items: SuggestItem[];
  onPress: (kind: string, name: string) => void;
}

export default (props: Props) => (
  <View style={{ padding: 20, backgroundColor: theme.color.white }}>
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
                src={getImageSrc(item.kind)}
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
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "500",
                  color: theme.color.gray
                }}
              >
                {item.title}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      ))}
  </View>
);

const getImageSrc = (kind: string) => {
  const item = KINDS[kind];

  return item.src;
};

const getImageColor = (kind: string) => {
  const item = KINDS[kind];

  return item.backgroundColor;
};
