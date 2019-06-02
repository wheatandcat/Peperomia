import { Google } from "expo";

import { AsyncStorage } from "react-native";
import React, { createContext, Component } from "react";
import * as firebase from "firebase";

const Context = createContext({});
const { Provider } = Context;

interface Props {}

interface State {
  email: string;
}

export default class extends Component<Props, State> {
  state = {
    email: ""
  };

  async componentDidMount() {
    const loggedIn = await this.loggedIn();

    console.log(loggedIn);

    if (loggedIn && !this.state.email) {
      const email = await AsyncStorage.getItem("email");
      if (email) {
        this.setState({
          email
        });
      }
    }
  }

  onGoogleLogin = async () => {
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

      await firebase.auth().signInAndRetrieveDataWithCredential(credential);

      this.setSession(true);
    }
  };

  loggedIn = async () => {
    const idToken = await this.getIdToken();
    console.log(idToken);

    return Boolean(idToken);
  };

  logout = async () => {
    console.log("logout");

    await firebase.auth().signOut();
    await AsyncStorage.removeItem("email");
    await AsyncStorage.removeItem("id_token");
    await AsyncStorage.removeItem("expiration");
  };

  setSession = async (refresh = false) => {
    console.log("setSession");

    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }

    if (user.email) {
      await AsyncStorage.setItem("email", user.email);
      this.setState({
        email: user.email
      });
    }

    const idToken = await user.getIdToken(refresh);
    await AsyncStorage.setItem("id_token", idToken);
    await AsyncStorage.setItem(
      "expiration",
      String(new Date().getTime() + 60 * 60)
    );

    return idToken;
  };

  getIdToken = async () => {
    const idToken = await AsyncStorage.getItem("id_token");
    if (!idToken) {
      return false;
    }

    const expiration = await AsyncStorage.getItem("expiration");
    if (Number(expiration) > new Date().getTime()) {
      return idToken;
    }

    return this.setSession(true);
  };

  render() {
    return (
      <Provider
        value={{
          onGoogleLogin: this.onGoogleLogin,
          getIdToken: this.getIdToken,
          loggedIn: this.loggedIn,
          logout: this.logout,
          email: this.state.email
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export const Consumer = Context.Consumer;
