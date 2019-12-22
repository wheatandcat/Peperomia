import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';
import { AsyncStorage, Platform } from 'react-native';
import React, { createContext, ReactNode, useState, useCallback } from 'react';
import Constants from 'expo-constants';
import * as Sentry from 'sentry-expo';
import * as firebase from 'firebase';
import { useDidMount } from '../hooks/index';

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

type Props = {
  children: ReactNode;
};

type State = {
  uid: string;
  email: string;
};

export type ContextProps = Partial<
  Pick<State, 'email' | 'uid'> & {
    onGoogleLogin: () => Promise<void>;
    getIdToken: () => Promise<string | null>;
    loggedIn: () => Promise<boolean>;
    logout: () => Promise<void>;
  }
>;

const isStandaloneAndAndroid = () => {
  return Platform.OS === 'android' && Constants.appOwnership !== 'expo';
};

export default (props: Props) => {
  const [state, setState] = useState<State>({
    email: '',
    uid: '',
  });

  const setSession = useCallback(async (refresh = false) => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return null;
    }

    if (user.email) {
      await AsyncStorage.setItem('email', user.email);
      await AsyncStorage.setItem('uid', user.uid);
      setState({
        email: user.email,
        uid: user.uid,
      });
    }

    const idToken = await user.getIdToken(refresh);
    await AsyncStorage.setItem('id_token', idToken);
    await AsyncStorage.setItem(
      'expiration',
      String(new Date().getTime() + 60 * 60)
    );

    return idToken;
  }, []);

  const getIdToken = useCallback(async () => {
    const idToken = await AsyncStorage.getItem('id_token');
    if (!idToken) {
      return null;
    }

    const expiration = await AsyncStorage.getItem('expiration');
    if (Number(expiration) > new Date().getTime()) {
      return idToken;
    }

    return setSession(true);
  }, [setSession]);

  const loggedIn = useCallback(async () => {
    const idToken = await getIdToken();

    return Boolean(idToken);
  }, [getIdToken]);

  const firebaseLogin = useCallback(
    async (idToken: string, accessToken: string) => {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );

      const data = await firebase
        .auth()
        .signInWithCredential(credential)
        .catch(error => {
          Sentry.captureMessage(JSON.stringify(error));
        });
      console.log(data);

      await setSession(true);
    },
    [setSession]
  );

  const onGoogleLogin = useCallback(async () => {
    if (isStandaloneAndAndroid()) {
      // TODO: AndroidのstandaloneのみGoogleSignInを使わないとエラーになる
      // https://github.com/expo/expo/issues/4762

      await GoogleSignIn.askForPlayServicesAsync();
      const result = await GoogleSignIn.signInAsync();

      if (result.type === 'success' && result.user && result.user.auth) {
        const { idToken, accessToken } = result.user.auth;
        await firebaseLogin(idToken || '', accessToken || '');
      } else {
        Sentry.captureMessage(JSON.stringify(result));
      }
    } else {
      const androidClientId = process.env.GOOGLE_LOGIN_ANDROID_CLIENT_ID;
      const iosClientId = process.env.GOOGLE_LOGIN_IOS_CLIENT_ID;
      const result = await Google.logInAsync({
        clientId:
          Platform.OS === 'ios' ? String(iosClientId) : String(androidClientId),
        iosClientId,
        androidClientId,
        scopes: ['profile', 'email'],
      });
      console.log(result);

      if (result.type === 'success') {
        const { idToken, accessToken } = result;
        await firebaseLogin(idToken || '', accessToken || '');
      } else {
        Sentry.captureMessage(JSON.stringify(result));
      }
    }
  }, [firebaseLogin]);

  useDidMount(() => {
    if (isStandaloneAndAndroid()) {
      const androidClientId = process.env.GOOGLE_LOGIN_ANDROID_CLIENT_ID;
      try {
        GoogleSignIn.initAsync({
          clientId: String(androidClientId),
        });
      } catch ({ message }) {
        Sentry.captureMessage(JSON.stringify(message));
      }
    }

    const checkLogin = async () => {
      const login = await loggedIn();

      if (login && !state.uid) {
        const uid = await AsyncStorage.getItem('uid');
        if (uid) {
          setState({
            ...state,
            uid,
          });
        }
      }

      if (login && !state.email) {
        const email = await AsyncStorage.getItem('email');
        if (email) {
          setState({
            ...state,
            email,
          });
        }
      }
    };

    checkLogin();
  });

  return (
    <Provider
      value={{
        onGoogleLogin: onGoogleLogin,
        getIdToken: getIdToken,
        loggedIn: loggedIn,
        logout: logout,
        email: state.email,
        uid: state.uid,
      }}
    >
      {props.children}
    </Provider>
  );
};

const logout = async () => {
  await firebase.auth().signOut();

  await AsyncStorage.removeItem('id_token');
  await AsyncStorage.removeItem('expiration');
  await AsyncStorage.removeItem('email');
};

export const Consumer = Context.Consumer;
