import React from "react";
import { Text, TouchableOpacity } from "react-native";
import theme from "../../../config/theme";

interface Props {
  label: string;
  testID?: string;
  onPress: () => void;
}

export default (props: Props) => (
  <TouchableOpacity
    onPress={props.onPress}
    testID={props.testID}
    style={{ padding: 5 }}
  >
    <Text
      style={{
        fontSize: 18,
        fontWeight: "600",
        color: theme.mode.header.text
      }}
    >
      {props.label}
    </Text>
  </TouchableOpacity>
);
