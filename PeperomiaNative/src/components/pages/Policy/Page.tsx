import React, { Component } from "react";
import { WebView } from "react-native";
interface Props {}

export default class extends Component<Props> {
  static navigationOptions = { title: "プライバシーポリシー" };

  render() {
    return (
      <WebView
        source={{
          uri: "https://peperomia.app/policy"
        }}
      />
    );
  }
}
