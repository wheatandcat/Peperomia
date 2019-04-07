import React, { Component } from "react";
import { WebView } from "react-native";
interface Props {}

export default class extends Component<Props> {
  render() {
    return (
      <WebView
        source={{
          uri: "https://frosty-panini-8d266e.netlify.com/policy"
        }}
      />
    );
  }
}
