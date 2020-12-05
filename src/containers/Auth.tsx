import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';
import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import * as AppleAuthentication from 'expo-apple-authentication';
import React, {
  memo,
  createContext,
  FC,
  useState,
  useCallback,
  useContext,
} from 'react';
import Constants from 'expo-constants';
import * as Sentry from 'sentry-expo';
import firebase from 'lib/system/firebase';
import { useDidMount } from 'hooks/index';
import { UID } from 'domain/user';
import libAuth from 'lib/auth';

const auth = new libAuth();

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
    onGoogleLogin: () => Promise<string | null>;
    onAppleLogin: () => Promise<string | null>;
    getIdToken: () => Promise<string | null>;
    loggedIn: () => Promise<boolean>;
    logout: () => Promise<void>;
  }
>;

const isStandaloneAndAndroid = () => {
  return Platform.OS === 'android' && Constants.appOwnership !== 'expo';
};

const Auth: FC<Props> = memo((props) => {
  const [state, setState] = useState<State>({
    email: '',
    uid: null,
    setup: false,
  });

  const setSession = useCallback(async (refresh = false) => {
    const idToken = await auth.setSession(refresh);

    if (idToken) {
      const user = firebase.auth().currentUser;
      if (user) {
        await AsyncStorage.setItem('email', user?.email || '');
        await AsyncStorage.setItem('uid', user.uid);
        setState((s) => ({
          ...s,
          email: user.email || '',
          uid: user.uid || '',
        }));
      }
    }

    return idToken;
  }, []);

  const getIdToken = useCallback(async () => {
    return await auth.getIdToken();
  }, []);

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

  if (!state.setup) {
    return null;
  }

  return (
    <Provider
      value={{
        onGoogleLogin: onGoogleLogin,
        onAppleLogin: onAppleLogin,
        getIdToken: getIdToken,
        loggedIn: loggedIn,
        logout: onLogout,
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
export const useAuth = () => useContext(Context);

export default Auth;

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
