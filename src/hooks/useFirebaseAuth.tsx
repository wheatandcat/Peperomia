import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';
import dayjs from 'dayjs';
import { useState, useCallback } from 'react';
import Constants from 'expo-constants';
import * as Sentry from 'sentry-expo';
import firebase from 'lib/system/firebase';
import { useDidMount } from 'hooks/index';
import { UID } from 'domain/user';

type State = {
  uid: UID;
  setup: boolean;
  email: string;
};

const logout = async () => {
  await firebase.auth().signOut();

  await AsyncStorage.removeItem('id_token');
  await AsyncStorage.removeItem('expiration');
  await AsyncStorage.removeItem('email');
};

const isStandaloneAndAndroid = () => {
  return Platform.OS === 'android' && Constants.appOwnership !== 'expo';
};
const nonceGen = (length: number) => {
  let result = '';
  let characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export type ResultUseFirebaseAuth = ReturnType<typeof useFirebaseAuth>;

const useFirebaseAuth = () => {
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
      setState((s) => ({
        ...s,
        email: user.email || '',
        uid: user.uid || '',
      }));
    }

    const idToken = await user.getIdToken(refresh);
    await AsyncStorage.setItem('id_token', idToken);
    const expiration = dayjs().add(1, 'hour').unix();

    await AsyncStorage.setItem('expiration', String(expiration));

    return idToken;
  }, []);

  const getIdToken = useCallback(async () => {
    const idToken = await AsyncStorage.getItem('id_token');

    if (!idToken) {
      return null;
    }

    const expiration = await AsyncStorage.getItem('expiration');

    if (
      dayjs(new Date(Number(expiration) * 1000)).isAfter(dayjs()) &&
      dayjs(new Date(Number(expiration) * 1000)).isBefore(dayjs().add(1, 'day'))
    ) {
      return idToken;
    }

    return await setSession(true);
  }, [setSession]);

  const loggedIn = useCallback(async () => {
    const idToken = await getIdToken();

    return Boolean(idToken);
  }, [getIdToken]);

  const firebaseLogin = useCallback(
    async (credential: firebase.auth.OAuthCredential) => {
      const data = await firebase
        .auth()
        .signInWithCredential(credential)
        .catch((error: any) => {
          console.log(error);
        });
      console.log(data);

      return await setSession(true);
    },
    [setSession]
  );

  const firebaseGoogleLogin = useCallback(
    async (idToken: string, accessToken: string) => {
      const credential = firebase.auth.GoogleAuthProvider.credential(
        idToken,
        accessToken
      );

      await firebaseLogin(credential);
    },
    [firebaseLogin]
  );

  const onAppleLogin = useCallback(async () => {
    const nonceString = nonceGen(32);

    try {
      const result = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
        state: nonceString,
      });
      const provider = new firebase.auth.OAuthProvider('apple.com');
      const credential = provider.credential({
        idToken: result.identityToken || '',
        rawNonce: nonceString,
      });

      await firebaseLogin(credential);
      return await AsyncStorage.getItem('uid');
    } catch (e) {
      console.log(e);
      return null;
    }
  }, [firebaseLogin]);

  const onGoogleLogin = useCallback(async () => {
    if (isStandaloneAndAndroid()) {
      // TODO: AndroidのstandaloneのみGoogleSignInを使わないとエラーになる
      // https://github.com/expo/expo/issues/4762

      await GoogleSignIn.askForPlayServicesAsync();
      const result = await GoogleSignIn.signInAsync();

      if (result.type === 'success' && result.user && result.user.auth) {
        const { idToken, accessToken } = result.user.auth;
        await firebaseGoogleLogin(idToken || '', accessToken || '');
        return await AsyncStorage.getItem('uid');
      } else {
        Sentry.captureMessage(JSON.stringify(result));
        return null;
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
        await firebaseGoogleLogin(idToken || '', accessToken || '');
        return await AsyncStorage.getItem('uid');
      } else {
        Sentry.captureMessage(JSON.stringify(result));
        return null;
      }
    }
  }, [firebaseGoogleLogin]);

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
          setState((s) => ({
            ...s,
            uid,
            setup: true,
          }));
        }
      } else {
        setState((s) => ({
          ...s,
          setup: true,
        }));
      }

      if (login && !state.email) {
        const email = await AsyncStorage.getItem('email');
        if (email) {
          setState((s) => ({
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

  const onLogout = useCallback(async () => {
    await logout();
    setState((s) => ({
      ...s,
      email: '',
      uid: null,
    }));
  }, []);

  return {
    ...state,
    onGoogleLogin: onGoogleLogin,
    onAppleLogin: onAppleLogin,
    getIdToken: getIdToken,
    loggedIn: loggedIn,
    logout: onLogout,
  };
};

export default useFirebaseAuth;
