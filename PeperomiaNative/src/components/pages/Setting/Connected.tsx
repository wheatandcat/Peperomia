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
import { useDidMount } from '../../../hooks/index';
import Tos from '../Tos/Page';
import Policy from '../Policy/Page';
import Feedback from '../Feedback/Connected';
import SignIn from '../SignIn/Connected';
import MyPage from '../MyPage/Connected';
import ScreenSetting from '../ScreenSetting/Connected';
import LoginWithAmazon from '../LoginWithAmazon/Connected';
import Page from './Page';

const Container = () => {
  const { loggedIn, logout } = useContext(AuthContext);
  const { post } = useContext(FetchContext);

  return <Connected loggedIn={loggedIn} logout={logout} post={post} />;
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

type ConnectedProps = Pick<FetchContextProps, 'post'> &
  Pick<AuthContextProps, 'loggedIn' | 'logout'>;

type State = {
  login: boolean;
  loading: boolean;
};

const Connected = memo((props: ConnectedProps) => {
  const { navigate } = useNavigation();
  const [state, setState] = useState<State>({
    loading: true,
    login: false,
  });

  useDidMount(() => {
    const check = async () => {
      if (props.loggedIn) {
        const loggedIn = await props.loggedIn();

        setState({
          login: loggedIn,
          loading: false,
        });
      }
    };

    check();
  });

  const onDeleteSQL = useCallback(() => {
    db.transaction((tx: SQLite.Transaction) => {
      deleteSql(tx);
    });
  }, []);

  const onResetSQL = useCallback(() => {
    db.transaction((tx: SQLite.Transaction) => {
      resetSql(tx);
    });
  }, []);

  const onData = useCallback(() => {
    db.transaction((tx: SQLite.Transaction) => {
      selectItems(tx, console.log);
      selectItemDetailds(tx, console.log);
      sqliteMaster(tx);
    });
  }, []);

  const onDeleteUser = useCallback(() => {
    db.transaction((tx: SQLite.Transaction) => {
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
        setState({
          login: true,
          loading: false,
        });
      },
    });
  }, [navigate]);

  const onMyPage = useCallback(() => {
    navigate('MyPage');
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
            if (props.logout) {
              await props.logout();
              setState(s => ({
                ...s,
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
    db.transaction((tx: SQLite.Transaction) => {
      resetSqlV100(tx);
    });

    AsyncStorage.setItem('APP_VERSION', '1.0.0');
  }, []);

  return (
    <Page
      loading={state.loading}
      login={state.login}
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
