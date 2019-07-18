import React, { Component } from "react";
import { Alert } from "react-native";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Consumer as AuthConsumer } from "../../../containers/Auth";
import { Consumer as FetchConsumer } from "../../../containers/Fetch";
import Page from "./Page";

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default class extends Component<Props> {
  render() {
    return (
      <AuthConsumer>
        {({ onGoogleLogin, logout }: any) => (
          <FetchConsumer>
            {({ post }: any) => (
              <Connected
                {...this.props}
                onGoogleLogin={onGoogleLogin}
                logout={logout}
                post={post}
              />
            )}
          </FetchConsumer>
        )}
      </AuthConsumer>
    );
  }
}

interface ConnectedProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  onGoogleLogin: () => void;
  logout: () => void;
  post: (url: string, param: any) => Promise<Response>;
}

class Connected extends Component<ConnectedProps> {
  static navigationOptions = { title: "ユーザー登録 / ログイン" };

  onGoogleLogin = async () => {
    try {
      await this.props.onGoogleLogin();
      const ok = await this.saveUser();
      if (ok) {
        const onLogin = this.props.navigation.getParam("onLogin", () => {});
        onLogin();

        this.props.navigation.goBack();
      } else {
        // 保存に失敗した時はログアウトさせる
        this.props.logout();
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  saveUser = async () => {
    console.log("saveUser");
    const response = await this.props.post("CreateUser", {});
    console.log(response);

    if (!response.ok) {
      Alert.alert("ユーザーの保存に失敗しました。");
      return false;
    }

    return true;
  };

  render() {
    return <Page onGoogleLogin={this.onGoogleLogin} />;
  }
}
