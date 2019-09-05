import * as GoogleSignIn from "expo-google-sign-in";
import * as Google from "expo-google-app-auth";
import { AsyncStorage, Platform } from "react-native";
import React, { createContext, Component } from "react";
import Constants from "expo-constants";
import { Sentry } from "react-native-sentry";
import * as firebase from "firebase";

const Context = createContext({});
const { Provider } = Context;

interface Props {}

interface State {
  uid: string;
  email: string;
}

const isStandaloneAndAndroid = () => {
  return Platform.OS === "android" && Constants.appOwnership !== "expo";
};

export default class extends Component<Props, State> {
  state = {
    email: "",
    uid: ""
  };

  async componentDidMount() {
    if (isStandaloneAndAndroid()) {
      const androidClientId = process.env.GOOGLE_LOGIN_ANDROID_CLIENT_ID;
      try {
        await GoogleSignIn.initAsync({
          clientId: String(androidClientId)
        });
      } catch ({ message }) {
        Sentry.captureMessage(JSON.stringify(message));
      }
    }

    const loggedIn = await this.loggedIn();

    if (loggedIn && !this.state.uid) {
      const uid = await AsyncStorage.getItem("uid");
      if (uid) {
        this.setState({
          uid
        });
      }
    }

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
    if (isStandaloneAndAndroid()) {
      // TODO: AndroidのstandaloneのみGoogleSignInを使わないとエラーになる
      // https://github.com/expo/expo/issues/4762

      await GoogleSignIn.askForPlayServicesAsync();
      const result = await GoogleSignIn.signInAsync();

      if (result.type === "success" && result.user && result.user.auth) {
        const { idToken, accessToken } = result.user.auth;
        await this.firebaseLogin(idToken || "", accessToken || "");
      } else {
        Sentry.captureMessage(JSON.stringify(result));
      }
    } else {
      const androidClientId = process.env.GOOGLE_LOGIN_ANDROID_CLIENT_ID;
      const iosClientId = process.env.GOOGLE_LOGIN_IOS_CLIENT_ID;
      const result = await Google.logInAsync({
        clientId:
          Platform.OS === "ios" ? String(iosClientId) : String(androidClientId),
        iosClientId,
        androidClientId,
        scopes: ["profile", "email"]
      });

      if (result.type === "success") {
        const { idToken, accessToken } = result;
        await this.firebaseLogin(idToken || "", accessToken || "");
      } else {
        Sentry.captureMessage(JSON.stringify(result));
      }
    }
  };

  firebaseLogin = async (idToken: string, accessToken: string) => {
    const credential = firebase.auth.GoogleAuthProvider.credential(
      idToken,
      accessToken
    );

    await firebase
      .auth()
      .signInAndRetrieveDataWithCredential(credential)
      .catch(error => {
        Sentry.captureMessage(JSON.stringify(error));
      });

    await this.setSession(true);
  };

  loggedIn = async () => {
    const idToken = await this.getIdToken();

    return Boolean(idToken);
  };

  logout = async () => {
    await firebase.auth().signOut();

    await AsyncStorage.removeItem("id_token");
    await AsyncStorage.removeItem("expiration");
    await AsyncStorage.removeItem("email");
  };

  setSession = async (refresh = false) => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return;
    }

    if (user.email) {
      await AsyncStorage.setItem("email", user.email);
      await AsyncStorage.setItem("uid", user.uid);
      this.setState({
        email: user.email,
        uid: user.uid
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
      return null;
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
          email: this.state.email,
          uid: this.state.uid
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export const Consumer = Context.Consumer;
