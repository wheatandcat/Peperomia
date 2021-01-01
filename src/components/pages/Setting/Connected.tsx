import * as SQLite from 'expo-sqlite';
import React, { useState, memo, useCallback, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { navigationOption } from 'lib/navigation';
import { db } from 'lib/db';
import {
  deleteSql,
  resetSql,
  resetSqlV100,
  deleteUserSql,
  sqliteMaster,
} from 'lib/db/debug';
import { select as selectItems } from 'lib/db/item';
import { select as selectItemDetailds } from 'lib/db/itemDetail';
import { useAuth, ContextProps as AuthContextProps } from 'containers/Auth';
import { useFetch, ContextProps as FetchContextProps } from 'containers/Fetch';
import {
  useCalendars,
  ContextProps as CalendarsContextProps,
} from 'containers/Calendars';
import useIsFirstRender from 'hooks/useIsFirstRender';
import { setDebugMode, getDebugMode } from 'lib/auth';
import { RootStackParamList } from 'lib/navigation';
import Tos from '../Tos/Page';
import Policy from '../Policy/Page';
import Feedback from '../Feedback/Connected';
import SignIn from '../SignIn';
import MyPage from '../MyPage';
import LoginWithAmazon from '../LoginWithAmazon/Connected';
import theme, { darkMode } from 'config/theme';
import FocusAwareStatusBar from 'components/organisms/FocusAwareStatusBar';
import Page from './Page';

const Container = () => {
  const { loggedIn, logout, uid } = useAuth();
  const { post } = useFetch();
  const { refetchCalendars } = useCalendars();

  return (
    <Connected
      loggedIn={loggedIn}
      logout={logout}
      post={post}
      uid={uid}
      refetchCalendars={refetchCalendars}
    />
  );
};

export type ConnectedType = State &
  Pick<AuthContextProps, 'uid'> & {
    onResetSQL: () => void;
    onDeleteSQL: () => void;
    onShowSQL: () => void;
    onData: () => void;
    onDeleteUser: () => void;
    onTos: () => void;
    onPolicy: () => void;
    onSignIn: () => void;
    onLogout: () => void;
    onFeedback: () => void;
    onMyPage: () => void;
    onNotificationSetting: () => void;
    onMigrationV100: () => void;
    onLoginWithAmazon: () => void;
    onChangeDebugMode: (val: boolean) => void;
  };

type ConnectedProps = Pick<CalendarsContextProps, 'refetchCalendars'> &
  Pick<FetchContextProps, 'post'> &
  Pick<AuthContextProps, 'loggedIn' | 'logout' | 'uid'>;

type State = {
  login: boolean;
  loading: boolean;
  restoreLoading: boolean;
  debugMode: boolean;
};

const Connected = memo((props: ConnectedProps) => {
  const { navigate } = useNavigation();
  const [state, setState] = useState<State>({
    loading: true,
    login: false,
    restoreLoading: false,
    debugMode: false,
  });
  const isFirstRender = useIsFirstRender();

  useEffect(() => {
    if (!isFirstRender) return;
    const check = async () => {
      if (props.loggedIn) {
        const loggedIn = await props.loggedIn();

        setState((s) => ({
          ...s,
          login: loggedIn,
          loading: false,
        }));
      }
      const debugMode = await getDebugMode();
      setState((s) => ({
        ...s,
        debugMode,
      }));
    };

    check();
  }, [isFirstRender, props]);

  const onDeleteSQL = useCallback(() => {
    db.transaction((tx: SQLite.SQLTransaction) => {
      deleteSql(tx);
    });
  }, []);

  const onResetSQL = useCallback(() => {
    db.transaction((tx: SQLite.SQLTransaction) => {
      resetSql(tx);
    });
  }, []);

  const onData = useCallback(() => {
    db.transaction((tx: SQLite.SQLTransaction) => {
      selectItems(tx, console.log);
      selectItemDetailds(tx, console.log);
      sqliteMaster(tx);
    });
  }, []);

  const onDeleteUser = useCallback(() => {
    db.transaction((tx: SQLite.SQLTransaction) => {
      deleteUserSql(tx);
    });

    AsyncStorage.removeItem('FIRST_CREATE_ITEM');
  }, []);

  const onShowSQL = useCallback(() => {}, []);

  const onTos = useCallback(() => {
    navigate('Tos');
  }, [navigate]);

  const onPolicy = useCallback(() => {
    navigate('Policy');
  }, [navigate]);

  const onFeedback = useCallback(() => {
    navigate('Feedback');
  }, [navigate]);

  const onSignIn = useCallback(() => {
    navigate('SignIn', {
      onLogin: () => {
        setState((s) => ({
          ...s,
          login: true,
          loading: false,
        }));
      },
    });
  }, [navigate]);

  const onMyPage = useCallback(() => {
    navigate('MyPage');
  }, [navigate]);

  const onNotificationSetting = useCallback(() => {
    navigate('NotificationSetting');
  }, [navigate]);

  const onLogout = useCallback(() => {
    Alert.alert(
      'ログアウトしますか',
      '',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: 'ログアウト',
          onPress: async () => {
            try {
              if (props.logout && props.refetchCalendars) {
                setState((s) => ({
                  ...s,
                  restoreLoading: true,
                }));

                await props.logout();
                await props.refetchCalendars();

                setState((s) => ({
                  ...s,
                  restoreLoading: false,
                  login: false,
                }));
              }
            } catch (err) {
              setState((s) => ({
                ...s,
                restoreLoading: false,
                login: false,
              }));
            }
          },
        },
      ],
      { cancelable: false }
    );
  }, [props]);

  const onLoginWithAmazon = useCallback(() => {
    navigate('LoginWithAmazon');
  }, [navigate]);

  const onMigrationV100 = useCallback(() => {
    db.transaction((tx: SQLite.SQLTransaction) => {
      resetSqlV100(tx);
    });

    AsyncStorage.setItem('APP_VERSION', '1.0.0');
  }, []);

  const onChangeDebugMode = useCallback(async (val: boolean) => {
    await setDebugMode(val);
    setState((s) => ({
      ...s,
      debugMode: val,
    }));
  }, []);

  return (
    <>
      <FocusAwareStatusBar
        backgroundColor={
          darkMode() ? theme().color.black : theme().color.primary.main
        }
        barStyle={darkMode() ? 'light-content' : 'dark-content'}
      />
      <Page
        loading={state.loading}
        uid={props.uid}
        restoreLoading={state.restoreLoading}
        login={state.login}
        debugMode={state.debugMode}
        onResetSQL={onResetSQL}
        onData={onData}
        onDeleteSQL={onDeleteSQL}
        onDeleteUser={onDeleteUser}
        onShowSQL={onShowSQL}
        onTos={onTos}
        onPolicy={onPolicy}
        onFeedback={onFeedback}
        onSignIn={onSignIn}
        onLogout={onLogout}
        onMyPage={onMyPage}
        onNotificationSetting={onNotificationSetting}
        onMigrationV100={onMigrationV100}
        onLoginWithAmazon={onLoginWithAmazon}
        onChangeDebugMode={onChangeDebugMode}
      />
    </>
  );
});

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Setting">
      <Stack.Screen
        name="Setting"
        component={Container}
        options={navigationOption('設定')}
      />
      <Stack.Screen
        name="Tos"
        component={Tos}
        options={navigationOption('利用規約')}
      />
      <Stack.Screen
        name="Policy"
        component={Policy}
        options={navigationOption('プライバシーポリシー')}
      />
      <Stack.Screen
        name="Feedback"
        component={Feedback}
        options={navigationOption('フィードバック')}
      />
      <Stack.Screen
        name="SignIn"
        component={SignIn}
        options={navigationOption('ユーザー登録 / ログイン')}
      />
      <Stack.Screen
        name="MyPage"
        component={MyPage}
        options={navigationOption('マイページ')}
      />
      <Stack.Screen
        name="LoginWithAmazon"
        component={LoginWithAmazon}
        options={navigationOption('Amazonアカウント連携')}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
