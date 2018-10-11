import React, { Component } from "react";
import { View, Text } from "react-native";

export interface Props {}

export default class extends Component<Props> {
  static navigationOptions = {
    title: "スケジュール"
  };

  render() {
    return (
      <View>
        <Text>test</Text>
      </View>
    );
  }
}
