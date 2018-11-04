import React, { Component } from "react";
import { View } from "react-native";
import { List, Divider, Title } from "react-native-paper";

export interface Props {}

export default class extends Component<Props> {
  render() {
    return (
      <View style={{ backgroundColor: "#ffffff" }}>
        <Title style={{ backgroundColor: "#efefef" }}> デバッグ機能</Title>
        <List.Item title="sqllite 初期化" />
        <Divider />
        <List.Item title="First Item" />
      </View>
    );
  }
}
