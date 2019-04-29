import React, { Component } from "react";
import { View, ScrollView, Text, AsyncStorage } from "react-native";
import { List, Divider, Title } from "react-native-paper";
import { ListItem } from "react-native-elements";
import { Constants } from "expo";
import app from "../../../../app.json";

export interface Props {
  onResetSQL: () => void;
  onDeleteSQL: () => void;
  onData: () => void;
  onDeleteUser: () => void;
  onTos: () => void;
  onPolicy: () => void;
  onFeedback: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <View style={{ backgroundColor: "#efefef", height: "100%" }}>
        <ScrollView>
          <View style={{ height: 50 }} />
          <ListItem
            title="お問い合わせ"
            rightIcon={{ name: "chevron-right", color: "#888" }}
            onPress={this.props.onFeedback}
          />
          <View style={{ height: 20 }} />
          <ListItem
            title="利用規約"
            rightIcon={{ name: "chevron-right", color: "#888" }}
            bottomDivider
            onPress={this.props.onTos}
          />
          <ListItem
            title="プライバシーポリシー"
            rightIcon={{ name: "chevron-right", color: "#888" }}
            onPress={this.props.onPolicy}
          />
          <View style={{ height: 20 }} />
          <ListItem
            title="バージョン情報"
            rightTitle={
              <Text style={{ color: "#555" }}>{app.expo.version} </Text>
            }
          />
          {!Constants.isDevice && (
            <>
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
              <List.Item
                title="ユーザー初期化"
                onPress={this.props.onDeleteUser}
              />
              <Divider />
              <List.Item
                title="アイテムを削除"
                onPress={this.props.onDeleteSQL}
              />
              <Divider />
              <List.Item title="sqllite DB" onPress={this.props.onData} />
              <Divider />
              <List.Item
                title="最初のプラン作成キャッシュの削除"
                onPress={() => {
                  AsyncStorage.removeItem("FIRST_CRAEATE_ITEM");
                }}
              />
              <Divider />
              <Divider />
            </>
          )}
        </ScrollView>
      </View>
    );
  }
}
