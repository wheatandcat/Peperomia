import React, { Component } from "react";
import { View, Dimensions, TouchableWithoutFeedback } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

interface Props {
  visible?: boolean;
  onPress: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <TouchableWithoutFeedback onPress={this.props.onPress}>
        <View
          style={{
            position: "absolute",
            top: -80,
            right: -12,
            width: deviceWidth + 5,
            height: deviceHeight + 100,
            backgroundColor: "rgba(0,0,0,0.8)"
          }}
        >
          {this.props.children}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}
