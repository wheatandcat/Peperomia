import React, { memo, createContext, FC, useCallback, useContext } from 'react';
import { Platform, Alert } from 'react-native';
import { Notifications } from 'expo';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

export type ContextProps = Partial<{
  onPermissionRequest: () => Promise<boolean>;
}>;

type Props = {};

const Notification: FC<Props> = memo((props) => {
  const onPermissionRequest = useCallback(async () => {
    if (!Constants.isDevice) {
      Alert.alert('端末から実行してくだださい');
      return false;
    }

    const { status: existingStatus } = await Permissions.getAsync(
      Permissions.NOTIFICATIONS
    );

    let finalStatus = existingStatus;
    if (existingStatus !== Permissions.PermissionStatus.GRANTED) {
      const { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      finalStatus = status;
    }

    if (finalStatus !== 'granted') {
      Alert.alert('Push通知のトークンの取得に失敗しました');
      return false;
    }

    const token = await Notifications.getExpoPushTokenAsync();

    if (Platform.OS === 'android') {
      Notifications.createChannelAndroidAsync('default', {
        name: 'default',
        sound: true,
        priority: 'max',
        vibrate: [0, 250, 250, 250],
      });
    }

    console.log(token);

    return true;
  }, []);

  return <Provider value={{ onPermissionRequest }}>{props.children}</Provider>;
});

export default Notification;

export const useNotification = () => useContext(Context);
export const Consumer = Context.Consumer;
