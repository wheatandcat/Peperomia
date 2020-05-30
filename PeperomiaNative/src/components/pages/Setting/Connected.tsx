import * as SQLite from 'expo-sqlite';
import React, { useState, memo, useCallback } from 'react';
import { AsyncStorage, Alert } from 'react-native';
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
import { useItems, ContextProps as ItemsContextProps } from 'containers/Items';
import { useDidMount } from 'hooks/index';
import { getFireStore } from 'lib/firebase';
import { resetQuery } from 'lib/firestore/debug';
import { findByUID } from 'lib/firestore/item';
import { setDebugMode, getDebugMode } from 'lib/auth';
import { RootStackParamList } from 'lib/navigation';
import Tos from '../Tos/Page';
import Policy from '../Policy/Page';
import Feedback from '../Feedback/Connected';
import SignIn from '../SignIn/Connected';
import MyPage from '../MyPage/Connected';
import ScreenSetting from '../ScreenSetting/Connected';
import LoginWithAmazon from '../LoginWithAmazon/Connected';
import NotificationSetting from 'components/pages/NotificationSetting/Page';
import Page from './Page';

const Container = () => {
  const { loggedIn, logout, uid } = useAuth();
  const { post } = useFetch();
  const { refreshData } = useItems();

  return (
    <Connected
      loggedIn={loggedIn}
      logout={logout}
      post={post}
      uid={uid}
      refreshData={refreshData}
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
    onScreenSetting: () => void;
    onLoginWithAmazon: () => void;
    onFirestoreResetQuery: () => void;
    onFirestoreSelect: () => void;
    onChangeDebugMode: (val: boolean) => void;
  };

type ConnectedProps = Pick<ItemsContextProps, 'refreshData'> &
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

  useDidMount(() => {
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
  });

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

    AsyncStorage.removeItem('FIRST_CRAEATE_ITEM');
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

  const onScreenSetting = useCallback(() => {
    navigate('ScreenSetting');
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
              if (props.logout && props.refreshData) {
                setState((s) => ({
                  ...s,
                  restoreLoading: true,
                }));

                await props.logout();
                await props.refreshData(null);

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

  const onFirestoreResetQuery = useCallback(() => {
    if (!props.uid) {
      return;
    }

    const firestore = getFireStore();
    resetQuery(firestore, props.uid);
  }, [props.uid]);

  const onFirestoreSelect = useCallback(async () => {
    if (!props.uid) {
      return;
    }

    const firestore = getFireStore();
    const r = await findByUID(firestore, props.uid);
    console.log(r);
  }, [props.uid]);

  const onChangeDebugMode = useCallback(async (val: boolean) => {
    await setDebugMode(val);
    setState((s) => ({
      ...s,
      debugMode: val,
    }));
  }, []);

  return (
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
      onScreenSetting={onScreenSetting}
      onLoginWithAmazon={onLoginWithAmazon}
      onFirestoreResetQuery={onFirestoreResetQuery}
      onFirestoreSelect={onFirestoreSelect}
      onChangeDebugMode={onChangeDebugMode}
    />
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
        name="ScreenSetting"
        component={ScreenSetting}
        options={navigationOption('画面設定')}
      />
      <Stack.Screen
        name="LoginWithAmazon"
        component={LoginWithAmazon}
        options={navigationOption('Amazonアカウント連携')}
      />
      <Stack.Screen
        name="NotificationSetting"
        component={NotificationSetting}
        options={navigationOption('通知テスト')}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
