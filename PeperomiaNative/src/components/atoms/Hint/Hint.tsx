import React, { Component } from "react";
import { View, TouchableOpacity, AsyncStorage } from "react-native";
import Mask from "./Mask";
import BottomRight from "./BottomRight";

interface Props {
  onPress: () => void;
}

interface State {
  visible: boolean;
}

export default class extends Component<Props, State> {
  state = {
    visible: false
  };

  async componentDidMount() {
    const visible = await AsyncStorage.getItem("FIRST_CRAEATE_ITEM");

    this.setState({
      visible: !Boolean(visible)
    });
  }

  onPress = () => {
    this.setState({
      visible: false
    });

    AsyncStorage.setItem("FIRST_CRAEATE_ITEM", "true");
  };

  onPushPress = () => {
    this.setState({
      visible: false
    });

    AsyncStorage.setItem("FIRST_CRAEATE_ITEM", "true");
    this.props.onPress();
  };

  render() {
    if (!this.state.visible) {
      return (
        <TouchableOpacity onPress={this.props.onPress}>
          {this.props.children}
        </TouchableOpacity>
      );
    }

    return (
      <>
        <BottomRight />
        <TouchableOpacity onPress={this.onPushPress}>
          {this.props.children}
        </TouchableOpacity>
      </>
    );
  }
}
