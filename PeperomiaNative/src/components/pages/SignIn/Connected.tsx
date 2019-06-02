import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Consumer as AuthConsumer } from "../../../containers/Auth";
import Page from "./Page";

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default class extends Component<Props> {
  render() {
    return (
      <AuthConsumer>
        {({ onGoogleLogin }: any) => (
          <Connected {...this.props} onGoogleLogin={onGoogleLogin} />
        )}
      </AuthConsumer>
    );
  }
}

interface ConnectedProps {
  navigation: NavigationScreenProp<NavigationRoute>;
  onGoogleLogin: () => void;
}

class Connected extends Component<ConnectedProps> {
  static navigationOptions = { title: "ユーザー登録 / ログイン" };

  onGoogleLogin = async () => {
    try {
      await this.props.onGoogleLogin();
      const onLogin = this.props.navigation.getParam("onLogin", () => {});
      onLogin();
      this.props.navigation.goBack();
    } catch (err) {
      console.log("err:", err);
    }
  };

  render() {
    return <Page onGoogleLogin={this.onGoogleLogin} />;
  }
}
