import React, { memo, useState, useCallback } from 'react';
import { Alert } from 'react-native';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import uuidv4 from 'uuid/v4';
import { backup } from 'lib/backup';
import { ContextProps as AuthContextProps } from 'containers/Auth';
import { ContextProps as FetchContextProps } from 'containers/Fetch';
import { ContextProps as CalendarsContextProps } from 'containers/Calendars';
import CommonStatusBar from 'components/organisms/CommonStatusBar';
import { Props as IndexProps } from './';
import Page from './Page';

dayjs.extend(advancedFormat);

type Props = IndexProps &
  Pick<CalendarsContextProps, 'refetchCalendars'> &
  Pick<AuthContextProps, 'onGoogleLogin' | 'onAppleLogin' | 'logout' | 'uid'> &
  Pick<FetchContextProps, 'post'>;

type ConnectedState = {
  loading: boolean;
};

const SignInConnected = memo((props: Props) => {
  const [state, setState] = useState<ConnectedState>({ loading: false });
  const onLogin = props.route?.params?.onLogin;

  const saveUser = useCallback(async () => {
    if (!props.post) {
      return false;
    }

    const response = await props.post('CreateUser', null);

    if (response.error) {
      Alert.alert('ユーザーの保存に失敗しました。');
    }

    return Number(response?.status);
  }, [props]);

  const backupItem = useCallback(async () => {
    if (!props.post) {
      return false;
    }

    const { items, itemDetails, calendars } = await backup();

    const uuidList = items.map((item) => ({
      from: item.id,
      to: uuidv4(),
    }));

    const request = {
      items: items.map((item) => ({
        ...item,
        id: uuidList.find((v) => v.from === item.id)?.to || '',
      })),
      itemDetails: itemDetails.map((itemDetail) => ({
        ...itemDetail,
        id: uuidv4(),
        itemId: uuidList.find((v) => v.from === itemDetail.itemId)?.to || '',
      })),
      calendars: calendars.map((calendar) => ({
        ...calendar,
        id: uuidv4(),
        itemId: uuidList.find((v) => v.from === calendar.itemId)?.to || '',
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

  const backupData = useCallback(async () => {
    if (!props.refetchCalendars) {
      return;
    }

    const httpStatus = await saveUser();
    if (httpStatus === 201) {
      // ユーザー作成した場合はデータをサーバーに送る
      const ok2 = await backupItem();
      if (ok2) {
        await props.refetchCalendars();
        if (onLogin) {
          onLogin();
        }
      }

      props.navigation.goBack();
    } else if (httpStatus === 200) {
      await props.refetchCalendars();
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
  }, [backupItem, props, saveUser, onLogin]);

  const onAppleLogin = useCallback(async () => {
    if (!props.onAppleLogin) {
      return;
    }
    try {
      const uid = await props.onAppleLogin();

      if (uid) {
        setState({
          loading: true,
        });

        await backupData();
      }
    } catch (err) {
      console.log('err:', err);
    }

    setState({
      loading: false,
    });
  }, [props, backupData]);

  const onGoogleLogin = useCallback(async () => {
    if (!props.onGoogleLogin) {
      return;
    }

    try {
      const uid = await props.onGoogleLogin();
      if (uid) {
        setState({
          loading: true,
        });

        await backupData();
      }
    } catch (err) {
      console.log('err:', err);
    }

    setState({
      loading: false,
    });
  }, [props, backupData]);

  return (
    <>
      <CommonStatusBar />
      <Page
        loading={state.loading}
        onGoogleLogin={onGoogleLogin}
        onAppleLogin={onAppleLogin}
      />
    </>
  );
});

export default SignInConnected;
