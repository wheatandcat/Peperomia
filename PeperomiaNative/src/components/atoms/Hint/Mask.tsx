import React, { Component } from "react";
import { View, Dimensions, TouchableOpacity, StyleSheet } from "react-native";
import theme from "../../../config/theme";

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
        <View style={styles.root}>{this.props.children}</View>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    top: -80,
    right: -12,
    width: deviceWidth,
    height: deviceHeight,
    backgroundColor: theme.color.yellow,
    zIndex: 50
  }
});
