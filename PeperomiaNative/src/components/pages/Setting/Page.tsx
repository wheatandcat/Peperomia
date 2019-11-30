import React, { Component } from "react";
import {
  View,
  ScrollView,
  Text,
  AsyncStorage,
  ActivityIndicator
} from "react-native";
import EStyleSheet from "react-native-extended-stylesheet";
import { Updates } from "expo";
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
  onScreenSetting: () => void;
  onLoginWithAmazon: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        <ScrollView>
          <ListItem
            title="お問い合わせ"
            rightIcon={{ name: "chevron-right", color: theme().mode.text }}
            containerStyle={styles.menu}
            titleStyle={styles.menuText}
            bottomDivider
            onPress={this.props.onFeedback}
          />
          <ListItem
            title="画面表示"
            rightIcon={{ name: "chevron-right", color: theme().mode.text }}
            containerStyle={styles.menu}
            titleStyle={styles.menuText}
            onPress={this.props.onScreenSetting}
          />
          <View style={{ height: 20 }} />
          <ListItem
            title="利用規約"
            rightIcon={{ name: "chevron-right", color: theme().mode.text }}
            containerStyle={styles.menu}
            titleStyle={styles.menuText}
            bottomDivider
            onPress={this.props.onTos}
          />
          <ListItem
            title="プライバシーポリシー"
            rightIcon={{ name: "chevron-right", color: theme().mode.text }}
            containerStyle={styles.menu}
            titleStyle={styles.menuText}
            onPress={this.props.onPolicy}
          />

          <View style={{ height: 20 }} />
          <ListItem
            title="バージョン情報"
            rightTitle={
              <Text style={{ color: theme().mode.text }}>
                {app.expo.version}{" "}
              </Text>
            }
            containerStyle={styles.menu}
            titleStyle={styles.menuText}
          />

          <View style={{ height: 20 }} />

          {(() => {
            if (this.props.loading) {
              return (
                <View
                  style={[
                    styles.menu,
                    {
                      height: 60,
                      justifyContent: "center",
                      alignItems: "center"
                    }
                  ]}
                >
                  <ActivityIndicator size="large" color={theme().mode.text} />
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
                      color: theme().mode.text
                    }}
                    containerStyle={styles.menu}
                    titleStyle={styles.menuText}
                    bottomDivider
                  />
                  <ListItem
                    title="ログアウト"
                    containerStyle={styles.menu}
                    titleStyle={{ color: theme().color.red }}
                    onPress={this.props.onLogout}
                    bottomDivider
                  />
                </>
              );
            }

            return (
              <ListItem
                title="ユーザー登録 / ログイン"
                rightIcon={{
                  name: "chevron-right",
                  color: theme().mode.text
                }}
                containerStyle={styles.menu}
                titleStyle={styles.menuText}
                onPress={this.props.onSignIn}
                bottomDivider
              />
            );
          })()}

          {!Constants.isDevice && (
            <ListItem
              title="Alexa連携を設定する"
              rightIcon={{
                name: "chevron-right",
                color: theme().mode.text
              }}
              containerStyle={styles.menu}
              titleStyle={styles.menuText}
              onPress={this.props.onLoginWithAmazon}
            />
          )}

          {!Constants.isDevice && (
            <>
              <View style={{ marginBottom: 50 }} />
              <Divider />
              <Text
                style={{
                  backgroundColor: theme().color.highLightGray,
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
              <ListItem
                title="アプリを再起動する"
                onPress={() => {
                  Updates.reload();
                }}
              />
              <Divider style={{ marginBottom: 50 }} />
            </>
          )}
        </ScrollView>
      </View>
    );
  }
}

const styles = EStyleSheet.create({
  root: {
    backgroundColor: "$settingRoot",
    height: "100%"
  },
  menu: {
    backgroundColor: "$settingMenu"
  },
  menuText: {
    color: "$text"
  }
});
