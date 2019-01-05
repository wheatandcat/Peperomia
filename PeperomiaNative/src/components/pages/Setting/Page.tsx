import React, { Component } from "react";
import { View } from "react-native";
import { List, Divider, Title } from "react-native-paper";

export interface Props {
  onResetSQL: () => void;
  onDeleteSQL: () => void;
  onData: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <View style={{ backgroundColor: "#ffffff" }}>
        <Title style={{ backgroundColor: "#efefef", paddingTop: 15 }}>
          {" "}
          デバッグ機能
        </Title>
        <List.Item
          title="sqllite 初期データ投入"
          testID="restSqlDebug"
          onPress={this.props.onResetSQL}
        />
        <Divider />
        <List.Item title="sqllite 全て削除" onPress={this.props.onDeleteSQL} />
        <Divider />
        <List.Item title="sqllite DB" onPress={this.props.onData} />
        <Divider />
        <List.Item title="First Item" />
      </View>
    );
  }
}
