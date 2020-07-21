import React, { Component } from 'react';
import { Alert, Dimensions, Linking, Platform } from 'react-native';
import Toast from 'react-native-root-toast';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import * as IntentLauncher from 'expo-intent-launcher';
import uuidv4 from 'uuid/v4';
import * as Sentry from 'sentry-expo';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { backup, restore } from 'lib/backup';
import { useFetch, ContextProps as FetchContextProps } from 'containers/Fetch';
import { useAuth, ContextProps as AuthContextProps } from 'containers/Auth';
import { useItems, ContextProps as ItemsContextProps } from 'containers/Items';
import {
  useNotification,
  ContextProps as NotificationContextProps,
} from 'containers/Notification';
import theme, { darkMode } from 'config/theme';
import FocusAwareStatusBar from 'components/organisms/FocusAwareStatusBar';
import Page from './Page';

dayjs.extend(advancedFormat);

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MyPage'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'MyPage'>;

type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const MyPageScreen: React.FC<Props> = (props) => {
  const { email, uid } = useAuth();
  const { post } = useFetch();
  const { refreshData } = useItems();
  const { onPermissionRequest } = useNotification();

  return (
    <Connected
      {...props}
      post={post}
      email={email}
      uid={uid}
      refreshData={refreshData}
      onPermissionRequest={onPermissionRequest}
    />
  );
};

export default MyPageScreen;

type ConnectedProps = Props &
  Pick<ItemsContextProps, 'refreshData'> &
  Pick<AuthContextProps, 'uid' | 'email'> &
  Pick<FetchContextProps, 'post'> &
  Pick<NotificationContextProps, 'onPermissionRequest'>;

type State = {
  loading: boolean;
  LoadingText: string;
};

class Connected extends Component<ConnectedProps, State> {
  state = {
    loading: false,
    LoadingText: '',
  };

  onBackup = async () => {
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
            this.backup();
          },
        },
      ],
      { cancelable: false }
    );
  };

  backup = async () => {
    if (!this.props.post) {
      return;
    }

    this.setState({
      loading: true,
      LoadingText: 'バックアップ中です...',
    });

    try {
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
      const response = await this.props.post('SyncItems', request);

      if (response.error) {
        Alert.alert('バックアップに失敗しました');
        this.setState({
          loading: false,
        });
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

      this.setState({
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });

      setTimeout(() => {
        Alert.alert('バックアップに失敗しました');
      }, 100);
    }
  };

  onRestore = async () => {
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
            this.restore();
          },
        },
      ],
      { cancelable: false }
    );
  };

  restore = async () => {
    if (!this.props.uid) {
      return;
    }

    this.setState({
      loading: true,
      LoadingText: '復元中です...',
    });

    try {
      await restore(this.props.uid);

      const { height } = Dimensions.get('window');

      let toast = Toast.show('データを復元しました', {
        duration: Toast.durations.LONG,
        position: height - 150,
        shadow: true,
        animation: true,
        hideOnPress: true,
        delay: 0,
      });

      // You can manually hide the Toast, or it will automatically disappear after a `duration` ms timeout.
      setTimeout(function () {
        Toast.hide(toast);
      }, 3000);

      if (this.props.refreshData) {
        await this.props.refreshData();
      }

      this.setState({
        loading: false,
      });
    } catch (err) {
      this.setState({
        loading: false,
      });

      setTimeout(() => {
        Alert.alert('復元に失敗しました', err.message);
      }, 100);
    }
  };

  onNotificationSetting = async () => {
    if (!this.props.onPermissionRequest) {
      return;
    }

    try {
      await this.props.onPermissionRequest();
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
  };

  render() {
    return (
      <>
        <FocusAwareStatusBar
          backgroundColor={
            darkMode() ? theme().color.black : theme().color.main
          }
          barStyle={darkMode() ? 'light-content' : 'dark-content'}
        />
        <Page
          loading={this.state.loading}
          LoadingText={this.state.LoadingText}
          email={this.props.email || ''}
          onBackup={this.onBackup}
          onRestore={this.onRestore}
          onNotificationSetting={this.onNotificationSetting}
        />
      </>
    );
  }
}
