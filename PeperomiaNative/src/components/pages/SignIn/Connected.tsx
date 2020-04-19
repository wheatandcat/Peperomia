import React, { memo, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { backup } from 'lib/backup';
import { useAuth, ContextProps as AuthContextProps } from 'containers/Auth';
import { useFetch, ContextProps as FetchContextProps } from 'containers/Fetch';
import { useItems, ContextProps as ItemsContextProps } from 'containers/Items';
import Page from './Page';

dayjs.extend(advancedFormat);

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'SignIn'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const SignInScreen = (props: Props) => {
  const { onGoogleLogin, onAppleLogin, logout, uid } = useAuth();
  const { post } = useFetch();
  const { refreshData } = useItems();

  return (
    <Connected
      {...props}
      uid={uid}
      post={post}
      logout={logout}
      refreshData={refreshData}
      onGoogleLogin={onGoogleLogin}
      onAppleLogin={onAppleLogin}
    />
  );
};

export default SignInScreen;

type ConnectedProps = Props &
  Pick<ItemsContextProps, 'refreshData'> &
  Pick<AuthContextProps, 'onGoogleLogin' | 'onAppleLogin' | 'logout' | 'uid'> &
  Pick<FetchContextProps, 'post'>;

type ConnectedState = {
  loading: boolean;
};

const Connected = memo((props: ConnectedProps) => {
  const [state, setState] = useState<ConnectedState>({ loading: false });
  const onLogin = props.route?.params?.onLogin;

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
      items: items.map((item) => ({
        ...item,
        id: String(item.id),
      })),
      itemDetails: itemDetails.map((itemDetail) => ({
        ...itemDetail,
        id: String(itemDetail.id),
        itemId: String(itemDetail.itemId),
      })),
      calendars: calendars.map((calendar) => ({
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

  const backupData = useCallback(
    async (uid: string) => {
      if (!props.refreshData) {
        return;
      }

      const ok1 = await saveUser();
      const ok2 = await backupItem();
      if (ok1 && ok2) {
        await props.refreshData(uid);
        if (onLogin) {
          onLogin();
        }

        props.navigation.goBack();
      } else {
        // 保存に失敗した時はログアウトさせる
        if (props.logout) {
          props.logout();
        }
      }
    },
    [backupItem, props, saveUser, onLogin]
  );

  const onAppleLogin = useCallback(async () => {
    if (!props.onAppleLogin || !props.refreshData) {
      return;
    }
    try {
      const uid = await props.onAppleLogin();

      if (uid) {
        setState({
          loading: true,
        });

        await backupData(uid);
      }
    } catch (err) {
      console.log('err:', err);
    }

    setState({
      loading: false,
    });
  }, [props, backupData]);

  const onGoogleLogin = useCallback(async () => {
    if (!props.onGoogleLogin || !props.refreshData) {
      return;
    }

    try {
      const uid = await props.onGoogleLogin();
      if (uid) {
        setState({
          loading: true,
        });

        await backupData(uid);
      }
    } catch (err) {
      console.log('err:', err);
    }

    setState({
      loading: false,
    });
  }, [props, backupData]);

  return (
    <Page
      loading={state.loading}
      onGoogleLogin={onGoogleLogin}
      onAppleLogin={onAppleLogin}
    />
  );
});
