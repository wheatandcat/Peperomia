import { Google } from "expo";
import * as firebase from "firebase";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import Page from "./Page";

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default class extends Component<Props> {
  static navigationOptions = { title: "ユーザー登録 / ログイン" };

  onGoogleLogin = async () => {
    try {
      const androidClientId = process.env.GOOGLE_LOGIN_ANDROID_CLIENT_ID;
      const iosClientId = process.env.GOOGLE_LOGIN_IOS_CLIENT_ID;
      const result = await Google.logInAsync({
        behavior: "web",
        iosClientId,
        androidClientId,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const { idToken, accessToken } = result;
        const credential = firebase.auth.GoogleAuthProvider.credential(
          idToken,
          accessToken
        );

        const response = await firebase
          .auth()
          .signInAndRetrieveDataWithCredential(credential);

        console.log(response);
      }
    } catch (err) {
      console.log("err:", err);
    }
  };

  render() {
    return <Page onGoogleLogin={this.onGoogleLogin} />;
  }
}
