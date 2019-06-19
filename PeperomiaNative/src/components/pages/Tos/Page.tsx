import React, { Component } from "react";
import { WebView } from "react-native";
interface Props {}

export default class extends Component<Props> {
  static navigationOptions = { title: "利用規約" };

  render() {
    return (
      <WebView
        source={{
          uri: "https://peperomia.app/tos"
        }}
      />
    );
  }
}
