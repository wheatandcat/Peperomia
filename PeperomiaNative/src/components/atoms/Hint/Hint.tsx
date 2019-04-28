import React, { Component } from "react";
import { TouchableOpacity, AsyncStorage } from "react-native";
import BottomRight from "./BottomRight";

interface Props {
  onPress: () => void;
  testID: string;
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
        <TouchableOpacity
          onPress={this.props.onPress}
          testID={this.props.testID}
        >
          {this.props.children}
        </TouchableOpacity>
      );
    }

    return (
      <>
        <BottomRight />
        <TouchableOpacity onPress={this.onPushPress} testID={this.props.testID}>
          {this.props.children}
        </TouchableOpacity>
      </>
    );
  }
}
