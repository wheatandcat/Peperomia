import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';
import { AsyncStorage, Platform } from 'react-native';
import dayjs from 'dayjs';
import React, { memo, createContext, FC, useState, useCallback } from 'react';
import Constants from 'expo-constants';
import * as Sentry from 'sentry-expo';
import * as firebase from 'firebase';
import { useDidMount } from '../hooks/index';
import { UID } from '../domain/user';

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

type Props = {};

type State = {
  uid: UID;
  setup: boolean;
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

const Auth: FC<Props> = memo(props => {
  const [state, setState] = useState<State>({
    email: '',
    uid: null,
    setup: false,
  });

  const setSession = useCallback(async (refresh = false) => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return null;
    }

    if (user.email) {
      await AsyncStorage.setItem('email', user.email);
      await AsyncStorage.setItem('uid', user.uid);
      setState(s => ({
        ...s,
        email: user.email || '',
        uid: user.uid || '',
      }));
    }

    const idToken = await user.getIdToken(refresh);
    await AsyncStorage.setItem('id_token', idToken);
    const expiration = dayjs()
      .add(1, 'hour')
      .unix();

    await AsyncStorage.setItem('expiration', String(expiration));

    return idToken;
  }, []);

  const getIdToken = useCallback(async () => {
    const idToken = await AsyncStorage.getItem('id_token');
    if (!idToken) {
      return null;
    }

    const expiration = await AsyncStorage.getItem('expiration');
    /**
    console.log(expiration);
    console.log(dayjs(new Date(Number(expiration) * 1000)).format());
    console.log(dayjs().format());
    console.log(dayjs(new Date(Number(expiration) * 1000)).isBefore(dayjs()));
    **/

    if (dayjs(new Date(Number(expiration) * 1000)).isBefore(dayjs())) {
      return idToken;
    }

    return await setSession(true);
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
          setState(s => ({
            ...s,
            uid,
            setup: true,
          }));
        }
      } else {
        setState(s => ({
          ...s,
          setup: true,
        }));
      }

      if (login && !state.email) {
        const email = await AsyncStorage.getItem('email');
        if (email) {
          setState(s => ({
            ...s,
            email,
          }));
        }
      }
    };

    firebase.auth().onAuthStateChanged(() => {
      checkLogin();
    });
  });

  if (!state.setup) {
    return null;
  }

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
});

const logout = async () => {
  await firebase.auth().signOut();

  await AsyncStorage.removeItem('id_token');
  await AsyncStorage.removeItem('expiration');
  await AsyncStorage.removeItem('email');
};

export const Consumer = Context.Consumer;
export default Auth;
