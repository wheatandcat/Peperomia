import React, { memo, useState, useCallback, useContext } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { backup } from '../../../lib/backup';
import theme from '../../../config/theme';
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
import Page from './Page';

dayjs.extend(advancedFormat);

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
};

const SignInScreen = (props: Props) => {
  const { onGoogleLogin, logout, uid } = useContext(AuthContext);
  const { post } = useContext(FetchContext);
  const { refreshData } = useContext(ItemsContext);

  return (
    <Connected
      {...props}
      uid={uid}
      post={post}
      logout={logout}
      refreshData={refreshData}
      onGoogleLogin={onGoogleLogin}
    />
  );
};

SignInScreen.navigationOptions = () => {
  return {
    title: 'ユーザー登録 / ログイン',
    headerBackTitle: '',
    headerTitleStyle: {
      color: theme().mode.header.text,
    },
    headerTintColor: theme().mode.header.text,
    headerStyle: {
      backgroundColor: theme().mode.header.backgroundColor,
    },
  };
};

export default SignInScreen;

type ConnectedProps = Pick<ItemsContextProps, 'refreshData'> &
  Pick<AuthContextProps, 'onGoogleLogin' | 'logout' | 'uid'> &
  Pick<FetchContextProps, 'post'> & {
    navigation: NavigationScreenProp<NavigationRoute>;
  };

type ConnectedState = {
  loading: boolean;
};

const Connected = memo((props: ConnectedProps) => {
  const [state, setState] = useState<ConnectedState>({ loading: false });

  const saveUser = useCallback(async () => {
    if (!props.post) {
      return false;
    }

    const response = await props.post('CreateUser', null);

    if (response.error) {
      Alert.alert('ユーザーの保存に失敗しました。');
      return false;
    }

    return true;
  }, [props]);

  const backupItem = useCallback(async () => {
    if (!props.post) {
      return false;
    }

    const { items, itemDetails, calendars } = await backup();

    const request = {
      items: items.map(item => ({
        ...item,
        id: String(item.id),
      })),
      itemDetails: itemDetails.map(itemDetail => ({
        ...itemDetail,
        id: String(itemDetail.id),
        itemId: String(itemDetail.itemId),
      })),
      calendars: calendars.map(calendar => ({
        ...calendar,
        id: String(calendar.id),
        itemId: String(calendar.itemId),
        date: dayjs(calendar.date).format(),
      })),
    };
    const response = await props.post('SyncItems', request);

    if (response.error) {
      Alert.alert('バックアップに失敗しました');
      return false;
    }

    return true;
  }, [props]);

  const onGoogleLogin = useCallback(async () => {
    if (!props.onGoogleLogin || !props.refreshData) {
      return;
    }

    try {
      const uid = await props.onGoogleLogin();
      setState({
        loading: true,
      });

      const ok1 = await saveUser();
      const ok2 = await backupItem();
      if (ok1 && ok2) {
        await props.refreshData(uid);
        const onLogin = props.navigation.getParam('onLogin', () => {});
        onLogin();

        props.navigation.goBack();
      } else {
        // 保存に失敗した時はログアウトさせる
        if (props.logout) {
          props.logout();
        }
      }
    } catch (err) {
      console.log('err:', err);
    }

    setState({
      loading: false,
    });
  }, [backupItem, props, saveUser]);

  return <Page loading={state.loading} onGoogleLogin={onGoogleLogin} />;
});
