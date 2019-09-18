import React from "react";
import { View, Text, Platform, StyleSheet } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import theme, { darkMode } from "../../../config/theme";

export interface Props {
  text: string;
  width: number;
  icon: string;
}

export default (props: Props) => (
  <View
    style={[
      styles.container,
      {
        width: props.width
      }
    ]}
  >
    <MaterialCommunityIcons
      name={props.icon}
      color={theme().color.lightGreen}
      size={24}
      style={{
        paddingRight: 2,
        paddingLeft: 1
      }}
    />
    <Text style={styles.text}>{props.text}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: theme().color.lightGray,
    backgroundColor: darkMode()
      ? theme().color.black
      : theme().color.highLightGray,
    paddingHorizontal: 3,
    paddingTop: Platform.OS === "ios" ? 2 : 0,
    paddingBottom: 0,
    borderRadius: 10
  },
  text: {
    fontSize: 14,
    fontWeight: "500",
    color: darkMode() ? theme().color.lightGray : theme().color.gray
  }
});
