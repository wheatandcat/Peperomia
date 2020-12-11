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
import {
  useSyncCalendarsMutation,
  SyncCalendarsMutationVariables,
  SyncCalendar,
  SyncItemDetail,
} from 'queries/api/index';
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
  const [syncCalendarsMutation] = useSyncCalendarsMutation({
    async onCompleted() {
      await props.refetchCalendars?.();
      if (onLogin) {
        onLogin();
      }

      props.navigation.goBack();
    },
    onError(err) {
      Alert.alert('バックアップに失敗しました', err.message);
    },
  });

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

  const backupData = useCallback(async () => {
    if (!props.refetchCalendars) {
      return;
    }

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
  }, [props, saveUser, onLogin, syncCalendarsMutation]);

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
