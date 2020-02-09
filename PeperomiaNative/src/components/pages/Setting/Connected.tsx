import * as SQLite from 'expo-sqlite';
import React, { useContext, useState, memo, useCallback } from 'react';
import { useNavigation } from 'react-navigation-hooks';
import { createStackNavigator } from 'react-navigation-stack';
import { AsyncStorage, Alert } from 'react-native';
import theme from '../../../config/theme';
import { db } from '../../../lib/db';
import {
  deleteSql,
  resetSql,
  resetSqlV100,
  deleteUserSql,
  sqliteMaster,
} from '../../../lib/db/debug';
import { select as selectItems } from '../../../lib/db/item';
import { select as selectItemDetailds } from '../../../lib/db/itemDetail';
import {
  Context as AuthContext,
  ContextProps as AuthContextProps,
} from '../../../containers/Auth';
import {
  Context as FetchContext,
  ContextProps as FetchContextProps,
} from '../../../containers/Fetch';
import {
  Context as ItemsContext,
  ContextProps as ItemsContextProps,
} from '../../../containers/Items';
import { useDidMount } from '../../../hooks/index';
import { getFireStore } from '../../../lib/firebase';
import { resetQuery } from '../../../lib/firestore/debug';
import { findByUID } from '../../../lib/firestore/item';
import { setDebugMode, getDebugMode } from '../../../lib/auth';
import Tos from '../Tos/Page';
import Policy from '../Policy/Page';
import Feedback from '../Feedback/Connected';
import SignIn from '../SignIn/Connected';
import MyPage from '../MyPage/Connected';
import ScreenSetting from '../ScreenSetting/Connected';
import LoginWithAmazon from '../LoginWithAmazon/Connected';
import Page from './Page';

const Container = () => {
  const { loggedIn, logout, uid } = useContext(AuthContext);
  const { post } = useContext(FetchContext);
  const { refreshData } = useContext(ItemsContext);

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

Container.navigationOptions = {
  title: '設定',
  headerTitleStyle: {
    color: theme().mode.header.text,
  },
  headerTintColor: theme().mode.header.text,
  headerStyle: {
    backgroundColor: theme().mode.header.backgroundColor,
  },
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

        setState(s => ({
          ...s,
          login: loggedIn,
          loading: false,
        }));
      }
      const debugMode = await getDebugMode();
      setState(s => ({
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
        setState(s => ({
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

  const onScreenSetting = useCallback(() => {
    navigate('ScreenSetting');
  }, [navigate]);

  /*
  const restoreItem = useCallback(async () => {
    if (!props.uid || !props.refreshData) {
      return false;
    }

    setState(s => ({
      ...s,
      restoreLoading: true,
    }));

    await restore(props.uid);

    await props.refreshData();

    setState(s => ({
      ...s,
      restoreLoading: false,
    }));
  }, [props]);
  */

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
                setState(s => ({
                  ...s,
                  restoreLoading: true,
                }));

                // await restoreItem();
                await props.logout();
                await props.refreshData(null);

                setState(s => ({
                  ...s,
                  restoreLoading: false,
                  login: false,
                }));
              }
            } catch (err) {
              setState(s => ({
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

    // デバッグ時はオフラインにする
    // await settingNetwork(false);

    const firestore = getFireStore();
    const r = await findByUID(firestore, props.uid);
    console.log(r);
  }, [props.uid]);

  const onChangeDebugMode = useCallback(async (val: boolean) => {
    await setDebugMode(val);
    setState(s => ({
      ...s,
      debugMode: val,
    }));
  }, []);

  return (
    <Page
      loading={state.loading}
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
      onMigrationV100={onMigrationV100}
      onScreenSetting={onScreenSetting}
      onLoginWithAmazon={onLoginWithAmazon}
      onFirestoreResetQuery={onFirestoreResetQuery}
      onFirestoreSelect={onFirestoreSelect}
      onChangeDebugMode={onChangeDebugMode}
    />
  );
});

export default createStackNavigator(
  {
    Setting: Container,
    Tos: Tos,
    Policy: Policy,
    Feedback: Feedback,
    SignIn: SignIn,
    MyPage: MyPage,
    ScreenSetting: ScreenSetting,
    LoginWithAmazon: LoginWithAmazon,
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme().mode.header.backgroundColor,
      },
      headerTitleStyle: {
        color: theme().mode.header.text,
      },
      headerTintColor: theme().mode.header.text,
    },
  }
);
