import React, { Component } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Button } from "react-native-elements";
import { whenIPhoneSE } from "../../lib/responsive";

export interface Props {
  onPress: () => void;
}

export default class extends Component<Props> {
  render() {
    const size = whenIPhoneSE(60, 80);

    return (
      <Button
        title=""
        icon={
          <MaterialIcons
            name="edit"
            size={whenIPhoneSE(30, 45)}
            color="#FFFFFF"
          />
        }
        buttonStyle={{
          backgroundColor: "#4DB6AC",
          width: size,
          height: size,
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
