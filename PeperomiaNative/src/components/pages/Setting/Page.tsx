import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { List, Divider, Title } from "react-native-paper";
import { ListItem } from "react-native-elements";
import Constants from "expo-constants";
import app from "../../../../app.json";

export interface Props {
  login: boolean;
  loading: boolean;
  onResetSQL: () => void;
  onDeleteSQL: () => void;
  onShowSQL: () => void;
  onData: () => void;
  onDeleteUser: () => void;
  onTos: () => void;
  onPolicy: () => void;
  onSignIn: () => void;
  onLogout: () => void;
  onFeedback: () => void;
  onMyPage: () => void;
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

          <View style={{ height: 20 }} />

          {(() => {
            if (this.props.loading) {
              return (
                <View
                  style={{
                    height: 60,
                    backgroundColor: "#fff",
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <ActivityIndicator size="large" color="#aaa" />
                </View>
              );
            }

            if (this.props.login) {
              return (
                <>
                  <ListItem
                    title="マイページ"
                    onPress={this.props.onMyPage}
                    rightIcon={{ name: "chevron-right", color: "#888" }}
                    bottomDivider
                  />
                  <ListItem
                    title="ログアウト"
                    titleStyle={{ color: "#dc143c" }}
                    onPress={this.props.onLogout}
                  />
                </>
              );
            }

            return (
              <ListItem
                title="ユーザー登録 / ログイン"
                rightIcon={{ name: "chevron-right", color: "#888" }}
                onPress={this.props.onSignIn}
              />
            );
          })()}

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
              <List.Item title="DBのデータを表示" onPress={this.props.onData} />
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
