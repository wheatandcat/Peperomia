import React, { Component } from 'react';
import {
  createStackNavigator,
  StackNavigationProp,
} from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { Consumer as ItemsConsumer, ContextProps } from 'containers/Items';
import Schedule from '../Schedule/Switch';
import EditPlan from '../EditPlan/Connected';
import Page from './Page';

type CalendarsScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Calendars'
>;

type Props = {
  navigation: CalendarsScreenNavigationProp;
};

export class Container extends Component<Props> {
  onCreate = (date: string) => {
    this.props.navigation.navigate('CreatePlan', {
      date,
    });
  };

  onSchedule = (id: string | number, title: string) => {
    this.props.navigation.navigate('Schedule', { itemId: id, title });
  };

  render() {
    return (
      <ItemsConsumer>
        {({ calendars, itemsLoading }: ContextProps) => (
          <Page
            calendars={calendars || []}
            loading={itemsLoading || false}
            onCreate={this.onCreate}
            onSchedule={this.onSchedule}
          />
        )}
      </ItemsConsumer>
    );
  }
}
const Stack = createStackNavigator();

const RootStack = () => {
  return (
    <Stack.Navigator initialRouteName="Calendars">
      <Stack.Screen
        name="Calendars"
        component={Container}
        options={{ header: () => null }}
      />
      <Stack.Screen name="Schedule" component={Schedule} />
      <Stack.Screen name="EditPlan" component={EditPlan} />
    </Stack.Navigator>
  );
};

export default RootStack;
