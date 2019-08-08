import React from "react";
import { View, Text, Platform } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme from "../../../config/theme";

export interface Props {
  text: string;
  width: number;
  icon: string;
}

export default (props: Props) => (
  <View
    style={{
      flexDirection: "row",
      alignItems: "center",
      borderWidth: 1,
      borderColor: theme.color.lightGray,
      backgroundColor: theme.color.highLightGray,
      width: props.width,
      paddingHorizontal: 3,
      paddingTop: Platform.OS === "ios" ? 2 : 0,
      paddingBottom: 0,
      borderRadius: 10
    }}
  >
    <MaterialCommunityIcons
      name={props.icon}
      color={theme.color.lightGreen}
      size={24}
      style={{
        paddingRight: 2,
        paddingLeft: 1
      }}
    />
    <Text
      style={{
        fontSize: 14,
        fontWeight: "500",
        color: theme.color.gray
      }}
    >
      {props.text}
    </Text>
  </View>
);
