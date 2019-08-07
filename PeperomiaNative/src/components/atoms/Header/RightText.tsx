import React from "react";
import { Text, TouchableOpacity } from "react-native";
import theme from "../../../config/theme";

interface Props {
  label: string;
  testID?: string;
  onPress: () => void;
}

export default (props: Props) => (
  <TouchableOpacity onPress={props.onPress} testID={props.testID}>
    <Text
      style={{
        fontSize: 18,
        fontWeight: "600",
        color: theme.color.lightGreen
      }}
    >
      {props.label}
    </Text>
  </TouchableOpacity>
);
