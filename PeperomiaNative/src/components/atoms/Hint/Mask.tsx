import React, { Component } from "react";
import { View, Dimensions, TouchableOpacity } from "react-native";

const deviceHeight = Dimensions.get("window").height;
const deviceWidth = Dimensions.get("window").width;

interface Props {
  visible?: boolean;
  onPress: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <TouchableOpacity onPress={this.props.onPress}>
        <View
          style={{
            position: "absolute",
            top: -80,
            right: -12,
            width: deviceWidth,
            height: deviceHeight,
            backgroundColor: "#ff0",
            zIndex: 50
          }}
        >
          {this.props.children}
        </View>
      </TouchableOpacity>
    );
  }
}
