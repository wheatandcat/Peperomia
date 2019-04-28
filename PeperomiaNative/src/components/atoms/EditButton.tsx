import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-elements";

export interface Props {
  onPress: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <Button
        title=""
        icon={<MaterialIcons name="edit" size={45} color="#FFFFFF" />}
        buttonStyle={{
          backgroundColor: "#4DB6AC",
          width: 80,
          height: 80,
          borderColor: "transparent",
          borderWidth: 0,
          borderRadius: 45
        }}
        onPress={this.props.onPress}
        testID="addScheduleDetail"
      />
    );
  }
}
