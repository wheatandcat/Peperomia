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
import { ContextProps as ItemsContextProps } from 'containers/Items';
import { ContextProps as NotificationContextProps } from 'containers/Notification';
import theme, { darkMode } from 'config/theme';
import FocusAwareStatusBar from 'components/organisms/FocusAwareStatusBar';
import { Item } from 'lib/db/item';
import { ItemDetail } from 'lib/db/itemDetail';
import { Calendar } from 'lib/db/calendar';
import { Props as IndexProps } from './';
import Page from './Page';

dayjs.extend(advancedFormat);

type Props = IndexProps &
  Pick<ItemsContextProps, 'refreshData'> &
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

type uuidType = {
  from: any;
  to: string;
};

const setUUID = (
  items: Item[],
  itemDetails: ItemDetail[],
  calendars: Calendar[]
) => {
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

  return request;
};

const MyPageConnected: React.FC<Props> = (props) => {
  const [state, setState] = useState<State>(initialState());

  const setBackup = useCallback(async () => {
    if (!props.post) {
      return;
    }

    setState((s) => ({
      ...s,
      loading: true,
      LoadingText: 'バックアップ中です...',
    }));

    try {
      const { items, itemDetails, calendars } = await backup();
      const request = setUUID(items, itemDetails, calendars);

      const response = await props.post('SyncItems', request);
      if (response.error) {
        Alert.alert('バックアップに失敗しました');
        setState((s) => ({
          ...s,
          loading: false,
        }));
        return;
      }

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
    } catch (err) {
      setState((s) => ({
        ...s,
        loading: false,
      }));

      setTimeout(() => {
        Alert.alert('バックアップに失敗しました');
      }, 100);
    }
  }, [props]);

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

      if (props.refreshData) {
        await props.refreshData();
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
        backgroundColor={darkMode() ? theme().color.black : theme().color.main}
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
