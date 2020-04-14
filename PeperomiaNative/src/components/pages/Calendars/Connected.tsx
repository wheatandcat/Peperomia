import React, { memo, useCallback } from 'react';
import { RouteProp } from '@react-navigation/native';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { useItems } from 'containers/Items';
import Schedule, { ScheduleNavigationOptions } from '../Schedule/Switch';
import Page from './Page';

type CalendarsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Calendars'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Calendars'>;

type Props = {
  navigation: CalendarsScreenNavigationProp;
  route: ScreenRouteProp;
};

export type ConnectedType = {
  onCreate: (date: string) => void;
  onSchedule: (id: string | number, title: string) => void;
};

export const Container = memo((props: Props) => {
  const { calendars, itemsLoading } = useItems();

  const onCreate = useCallback(
    (date: string) => {
      props.navigation.navigate('CreatePlan', {
        date,
      });
    },
    [props.navigation]
  );

  const onSchedule = useCallback(
    (id: string | number, title: string) => {
      props.navigation.navigate('Schedule', { itemId: id, title });
    },
    [props.navigation]
  );

  return (
    <Page
      calendars={calendars || []}
      loading={itemsLoading || false}
      onCreate={onCreate}
      onSchedule={onSchedule}
    />
  );
});

const Stack = createStackNavigator<RootStackParamList>();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Calendars" mode="modal">
      <Stack.Screen
        name="Calendars"
        component={Container}
        options={{ header: () => null }}
      />
      <Stack.Screen
        name="Schedule"
        component={Schedule}
        options={ScheduleNavigationOptions}
      />
    </Stack.Navigator>
  );
};

export default RootStack;
