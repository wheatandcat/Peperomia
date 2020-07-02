import React, { memo, createContext, FC, useCallback, useContext } from 'react';
import { Platform, Alert } from 'react-native';
import * as Notifications from 'expo-notifications';
import * as Permissions from 'expo-permissions';
import Constants from 'expo-constants';
import { useFetch } from 'containers/Fetch';

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

export type ContextProps = Partial<{
  onPermissionRequest: () => Promise<boolean>;
}>;

type Props = {};

const Notification: FC<Props> = memo((props) => {
  const { post } = useFetch();

  const onPermissionRequest = useCallback(async () => {
    if (!post) {
      return false;
    }

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

    const { data: token } = await Notifications.getExpoPushTokenAsync();

    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }

    const request = {
      pushToken: {
        token,
        deviceId: Constants.deviceId,
      },
    };

    //Alert.alert(token);
    //console.log(token);

    const response = await post('CreatePushToken', request);

    if (response.error) {
      Alert.alert('更新に失敗しました');
      return false;
    }

    return true;
  }, [post]);

  return <Provider value={{ onPermissionRequest }}>{props.children}</Provider>;
});

export default Notification;

export const useNotification = () => useContext(Context);
export const Consumer = Context.Consumer;
