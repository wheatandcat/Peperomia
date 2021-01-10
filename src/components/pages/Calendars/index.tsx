import React, { memo, useCallback } from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { Alert } from 'react-native';
import { useCalendars } from 'containers/Calendars';
import Calendar from 'components/pages/Calendar/index';
import ItemDetail from 'components/pages/ItemDetail';
import AddItemDetail from 'components/pages/AddItemDetail/index';
import EditItemDetail from 'components/pages/EditItemDetail/index';
import { CreateCalendar } from 'components/pages/CreateCalendar/index';
import Icons, { IconsNavigationOptions } from 'components/pages/Icons';
import * as Notifications from 'expo-notifications';
import { Notification, NotificationResponse } from 'expo-notifications';
import { urlParser } from 'lib/urlScheme';
import Connected from './Connected';

type NotificationBodyType = {
  urlScheme?: string;
};

type CalendarsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Calendars'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Calendars'>;

export type Props = {
  navigation: CalendarsScreenNavigationProp;
  route: ScreenRouteProp;
};

const Calendars: React.FC<Props> = memo((props) => {
  const { calendars, loadingCalendars, setDate } = useCalendars();

  const respond = useCallback(
    (data: NotificationBodyType) => {
      const us = urlParser(data?.urlScheme || '');
      if (us) {
        props.navigation.navigate(us.routeName as any, us.params);
      }
    },
    [props.navigation]
  );

  const handleNotificationReceived = useCallback(
    (notification: Notification) => {
      const data = notification.request.content.data;

      if (!data?.urlScheme) {
        return;
      }

      Alert.alert('通知が届きました', '画面へ移動しますか？', [
        {
          text: 'キャンセル',
          style: 'cancel',
        },
        {
          text: '移動する',
          onPress: () => {
            respond(data);
          },
        },
      ]);
    },
    [respond]
  );

  const handleNotificationResponseReceived = useCallback(
    (notification: NotificationResponse) => {
      const data = notification.notification.request.content.data;

      if (!data?.urlScheme) {
        return;
      }

      respond(data);
    },
    [respond]
  );

  React.useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      handleNotificationReceived
    );
    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      handleNotificationResponseReceived
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  }, [handleNotificationReceived, handleNotificationResponseReceived]);

  return (
    <Connected
      {...props}
      calendars={calendars}
      loading={loadingCalendars}
      setDate={setDate}
    />
  );
});

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Calendars" mode="modal">
      <Stack.Screen
        name="Calendars"
        component={Calendars}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="CreateCalendar"
        component={CreateCalendar}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="ItemDetail"
        component={ItemDetail}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="AddItemDetail"
        component={AddItemDetail}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="EditItemDetail"
        component={EditItemDetail}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Icons"
        component={Icons}
        options={IconsNavigationOptions}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
