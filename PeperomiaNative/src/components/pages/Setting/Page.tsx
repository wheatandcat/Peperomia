import React, { Component } from "react";
import { View } from "react-native";
import { List, Divider, Title } from "react-native-paper";
import { ListItem } from "react-native-elements";

export interface Props {
  onResetSQL: () => void;
  onDeleteSQL: () => void;
  onData: () => void;
  onDeleteUser: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <View style={{ backgroundColor: "#efefef" }}>
        <View style={{ height: 50 }} />
        <ListItem
          title="お知らせ"
          rightIcon={{ name: "chevron-right", color: "#888" }}
        />
        <View style={{ height: 20 }} />
        <ListItem
          title="お問い合わせ"
          rightIcon={{ name: "chevron-right", color: "#888" }}
          bottomDivider
        />
        <ListItem
          title="アプリについて"
          rightIcon={{ name: "chevron-right", color: "#888" }}
          bottomDivider
        />
        <View style={{ marginBottom: 50 }} />
        <Title
          style={{
            backgroundColor: "#efefef",
            paddingTop: 15,
            paddingLeft: 10
          }}
        >
          デバッグ機能
        </Title>
        <List.Item
          title="初期データ投入"
          testID="restSqlDebug"
          onPress={this.props.onResetSQL}
        />
        <Divider />
        <List.Item title="ユーザー初期化" onPress={this.props.onDeleteUser} />
        <Divider />
        <List.Item title="アイテムを削除" onPress={this.props.onDeleteSQL} />
        <Divider />
        <List.Item title="sqllite DB" onPress={this.props.onData} />
        <Divider />
      </View>
    );
  }
}
