import React, { useState, useCallback, memo } from 'react';
import { Alert, Dimensions, Linking, Platform } from 'react-native';
import Toast from 'react-native-root-toast';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import * as IntentLauncher from 'expo-intent-launcher';
import uuidv4 from 'uuid/v4';
import * as Sentry from 'sentry-expo';
import { backup, restore } from 'lib/backup';
import { ContextProps as FetchContextProps } from 'containers/Fetch';
import { ContextProps as AuthContextProps } from 'containers/Auth';
import { ContextProps as CalendarContextProps } from 'containers/Calendars';
import { ContextProps as NotificationContextProps } from 'containers/Notification';
import theme, { darkMode } from 'config/theme';
import FocusAwareStatusBar from 'components/organisms/FocusAwareStatusBar';
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
  Pick<CalendarContextProps, 'refetchCalendars'> &
  Pick<AuthContextProps, 'uid' | 'email'> &
  Pick<FetchContextProps, 'post'> &
  Pick<NotificationContextProps, 'onPermissionRequest'>;

type State = {
  loading: boolean;
  LoadingText: string;
};

const initialState = (): State => ({
  loading: false,
  LoadingText: '',
});

const MyPageConnected: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());
  const [syncCalendarsMutation] = useSyncCalendarsMutation({
    async onCompleted() {
      await props.refetchCalendars?.();
      const { height } = Dimensions.get('window');

      let toast = Toast.show('バックアップを作成しました', {
        duration: Toast.durations.LONG,
        position: height - 150,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });

      setTimeout(function () {
        Toast.hide(toast);
      }, 3000);

      setState((s) => ({
        ...s,
        loading: false,
      }));
    },
    onError(err) {
      Alert.alert('バックアップに失敗しました', err.message);
      setState((s) => ({
        ...s,
        loading: false,
      }));
    },
  });

  const setBackup = useCallback(async () => {
    if (!props.post) {
      return;
    }

    setState((s) => ({
      ...s,
      loading: true,
      LoadingText: 'バックアップ中です...',
    }));

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
  }, [props, syncCalendarsMutation]);

  const onBackup = useCallback(async () => {
    Alert.alert(
      'バックアップを作成しますか？',
      '既にバックアップを作成している場合は上書きされます。',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '作成する',
          onPress: () => {
            setBackup();
          },
        },
      ],
      { cancelable: false }
    );
  }, [setBackup]);

  const setRestore = useCallback(async () => {
    if (!props.uid) {
      return;
    }
    setState((s) => ({
      ...s,
      loading: true,
      LoadingText: '復元中です...',
    }));

    try {
      await restore(props.uid);

      const { height } = Dimensions.get('window');

      let toast = Toast.show('データを復元しました', {
        duration: Toast.durations.LONG,
        position: height - 150,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });

      setTimeout(function () {
        Toast.hide(toast);
      }, 3000);

      if (props.refetchCalendars) {
        await props.refetchCalendars();
      }

      setState((s) => ({
        ...s,
        loading: false,
      }));
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
      }));

      setTimeout(() => {
        Alert.alert('復元に失敗しました', err.message);
      }, 100);
    }
  }, [props]);

  const onRestore = useCallback(async () => {
    Alert.alert(
      'バックアップから復元しますか？',
      '現在のデータは削除されるのでご注意ください',
      [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '復元する',
          onPress: () => {
            setRestore();
          },
        },
      ],
      { cancelable: false }
    );
  }, [setRestore]);

  const onNotificationSetting = useCallback(async () => {
    if (!props.onPermissionRequest) {
      return;
    }

    try {
      await props.onPermissionRequest();
    } catch (err) {
      Sentry.captureException(err);
    }

    if (Platform.OS === 'ios') {
      Linking.canOpenURL('app-settings:')
        .then((supported) => {
          if (supported) {
            return Linking.openURL('app-settings:');
          }
          Sentry.captureMessage('move to app-settings: not supported');
          return;
        })
        .catch((err) => Sentry.captureException(err));
    } else {
      IntentLauncher.startActivityAsync(
        IntentLauncher.ACTION_NOTIFICATION_SETTINGS
      );
    }
  }, [props]);

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
        LoadingText={state.LoadingText}
        email={props.email || ''}
        onBackup={onBackup}
        onRestore={onRestore}
        onNotificationSetting={onNotificationSetting}
      />
    </>
  );
};

export default memo(MyPageConnected);
