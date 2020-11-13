import React, { memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { useCalendars } from 'containers/Calendars';
import Calendar from 'components/pages/Calendar/index';
import AddItemDetail from 'components/pages/AddItemDetail/index';
import { CreateCalendar } from 'components/pages/CreateCalendar/index';
import Connected from './Connected';

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
        name="AddItemDetail"
        component={AddItemDetail}
        options={{ header: () => null }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
