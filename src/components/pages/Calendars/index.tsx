import React, { memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { useItems } from 'containers/Items';
import Schedule, { ScheduleNavigationOptions } from 'components/pages/Schedule';
import Calendar from 'components/pages/Calendar/index';
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
  const { calendars, itemsLoading } = useItems();

  return (
    <Connected
      {...props}
      calendars={calendars || []}
      loading={itemsLoading || false}
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
        name="Schedule"
        component={Schedule}
        options={ScheduleNavigationOptions}
      />
      <Stack.Screen
        name="Calendar"
        component={Calendar}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
