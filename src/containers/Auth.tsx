import * as GoogleSignIn from 'expo-google-sign-in';
import * as Google from 'expo-google-app-auth';
import { Platform, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import uuidv4 from 'uuid/v4';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import * as AppleAuthentication from 'expo-apple-authentication';
import React, {
  memo,
  createContext,
  FC,
  useState,
  useCallback,
  useContext,
  useEffect,
} from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';
import Spinner from 'react-native-loading-spinner-overlay';
import Constants from 'expo-constants';
import { backup } from 'lib/backup';
import * as Sentry from 'sentry-expo';
import firebase from 'lib/system/firebase';
import useIsFirstRender from 'hooks/useIsFirstRender';
import { UID } from 'domain/user';
import libAuth from 'lib/auth';
import {
  useSyncCalendarsMutation,
  SyncCalendarsMutationVariables,
  SyncCalendar,
  SyncItemDetail,
} from 'queries/api/index';
import { post } from 'lib/fetch';
import theme from 'config/theme';

dayjs.extend(advancedFormat);

const auth = new libAuth();

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

type Props = {};

type State = {
  uid: UID;
  setup: boolean;
  render: boolean;
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
    render: true,
    setup: false,
  });
  const isFirstRender = useIsFirstRender();
  const [syncCalendarsMutation] = useSyncCalendarsMutation({
    async onCompleted() {
      setRender();
    },
    onError(err) {
      Alert.alert('バックアップに失敗しました', err.message);
    },
  });

  const getIdToken = useCallback(async () => {
    return await auth.getIdToken();
  }, []);

  const setRender = useCallback(() => {
    setState((s) => ({
      ...s,
      render: true,
    }));
  }, []);

  const saveUser = useCallback(async () => {
    const idToken = await getIdToken();

    const response = await post('CreateUser', null, idToken || '');

    if (response?.error) {
      Alert.alert('ユーザーの保存に失敗しました。');
    }

    return Number(response?.status);
  }, [getIdToken]);

  const backupData = useCallback(async () => {
    const httpStatus = await saveUser();

    if (httpStatus === 201) {
      // ユーザーを新規で作成した場合はデータをサーバーに送る
      const { items, itemDetails, calendars } = await backup();

      const syncCalendars = calendars.map((v) => {
        const i = items.find((v1) => v1.id === v.itemId);
        let ids: SyncItemDetail[] = [];

        if (i) {
          ids = itemDetails
            .filter((v2) => v2.itemId === v.itemId)
            .map((id) => ({
              id: uuidv4(),
              title: id.title || '',
              kind: id?.kind || '',
              place: id?.place || '',
              url: id?.url || '',
              memo: id?.memo || '',
              priority: id?.priority || 1,
            }));
        }

        const r: SyncCalendar = {
          id: uuidv4(),
          date: dayjs(v.date).format('YYYY-MM-DDT00:00:00'),
          item: {
            id: uuidv4(),
            title: i?.title || '',
            kind: i?.kind || '',
            itemDetails: ids,
          },
        };

        return r;
      });

      const variables: SyncCalendarsMutationVariables = {
        calendars: {
          calendars: syncCalendars,
        },
      };

      syncCalendarsMutation({ variables });
    } else if (httpStatus === 200) {
      setRender();
    } else {
      Alert.alert('エラー', 'ユーザー登録/ログインに失敗しました', [
        {
          text: '閉じる',
          onPress: () => {
            setRender();
          },
        },
      ]);
    }
  }, [saveUser, syncCalendarsMutation, setRender]);

  const setSession = useCallback(
    async (refresh = false) => {
      const idToken = await auth.setSession(refresh);

      if (idToken) {
        const user = firebase.auth().currentUser;
        if (user) {
          setState((s) => ({
            ...s,
            render: false,
          }));
          await AsyncStorage.setItem('email', user?.email || '');
          await AsyncStorage.setItem('uid', user.uid);
          setState((s) => ({
            ...s,
            email: user.email || '',
            uid: user.uid || '',
          }));

          await backupData();
        }
      }

      return idToken;
    },
    [backupData]
  );

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

  useEffect(() => {
    if (!isFirstRender) return;

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
  }, [isFirstRender, state, loggedIn]);

  const onLogout = useCallback(async () => {
    setState((s) => ({
      ...s,
      render: false,
    }));

    await logout();
    setState((s) => ({
      ...s,
      email: '',
      uid: null,
      render: true,
    }));
  }, []);

  if (!state.setup) {
    return null;
  }

  if (!state.render) {
    return (
      <View style={styles.container}>
        <Spinner
          visible={true}
          textContent="読込中"
          textStyle={{ color: theme().color.white }}
        />
      </View>
    );
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

const styles = EStyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: '$background',
    height: '100%',
  },
});
