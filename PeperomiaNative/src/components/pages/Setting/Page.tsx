import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import { ListItem, Divider } from "react-native-elements";
import Constants from "expo-constants";
import theme from "../../../config/theme";
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
  onMigrationV100: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <View
        style={{ backgroundColor: theme.color.highLightGray, height: "100%" }}
      >
        <ScrollView>
          <View style={{ height: 50 }} />
          <ListItem
            title="お問い合わせ"
            rightIcon={{ name: "chevron-right", color: theme.color.gray }}
            onPress={this.props.onFeedback}
          />
          <View style={{ height: 20 }} />
          <ListItem
            title="利用規約"
            rightIcon={{ name: "chevron-right", color: theme.color.gray }}
            bottomDivider
            onPress={this.props.onTos}
          />
          <ListItem
            title="プライバシーポリシー"
            rightIcon={{ name: "chevron-right", color: theme.color.gray }}
            onPress={this.props.onPolicy}
          />

          <View style={{ height: 20 }} />
          <ListItem
            title="バージョン情報"
            rightTitle={
              <Text style={{ color: theme.color.gray }}>
                {app.expo.version}{" "}
              </Text>
            }
          />

          <View style={{ height: 20 }} />

          {(() => {
            if (this.props.loading) {
              return (
                <View
                  style={{
                    height: 60,
                    backgroundColor: theme.color.white,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <ActivityIndicator size="large" color={theme.color.gray} />
                </View>
              );
            }

            if (this.props.login) {
              return (
                <>
                  <ListItem
                    title="マイページ"
                    onPress={this.props.onMyPage}
                    rightIcon={{
                      name: "chevron-right",
                      color: theme.color.gray
                    }}
                    bottomDivider
                  />
                  <ListItem
                    title="ログアウト"
                    titleStyle={{ color: theme.color.red }}
                    onPress={this.props.onLogout}
                  />
                </>
              );
            }

            return (
              <ListItem
                title="ユーザー登録 / ログイン"
                rightIcon={{ name: "chevron-right", color: theme.color.gray }}
                onPress={this.props.onSignIn}
              />
            );
          })()}

          {!Constants.isDevice && (
            <>
              <View style={{ marginBottom: 50 }} />
              <Divider />
              <Text
                style={{
                  backgroundColor: theme.color.highLightGray,
                  paddingVertical: 15,
                  paddingLeft: 10,
                  fontSize: 20
                }}
              >
                デバッグ機能
              </Text>
              <Divider />
              <ListItem
                title="初期データ投入"
                onPress={this.props.onResetSQL}
              />
              <Divider />
              <ListItem
                title="ユーザー初期化"
                onPress={this.props.onDeleteUser}
              />
              <Divider />
              <ListItem
                title="v1.0.0の状態にする"
                onPress={this.props.onMigrationV100}
              />
              <Divider />
              <ListItem
                title="アイテムを削除"
                onPress={this.props.onDeleteSQL}
              />
              <Divider />
              <ListItem title="DBのデータを表示" onPress={this.props.onData} />
              <Divider />
              <ListItem
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
