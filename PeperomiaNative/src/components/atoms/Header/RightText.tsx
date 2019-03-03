import React from "react";
import { Text, TouchableOpacity } from "react-native";

interface Props {
  label: string;
  testID?: string;
  onPress: () => void;
}

export default (props: Props) => (
  <TouchableOpacity onPress={props.onPress} testID={props.testID}>
    <Text
      style={{
        fontSize: 16,
        fontWeight: "600",
        color: "#00bfff"
      }}
    >
      {props.label}
    </Text>
  </TouchableOpacity>
);
