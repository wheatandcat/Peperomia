import React, { Component } from 'react';
import { NavigationScreenProp, NavigationRoute } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import {
  Consumer as ItemsConsumer,
  ContextProps,
} from '../../../containers/Items';
import theme from '../../../config/theme';
import Schedule from '../Schedule/Switch';
import EditPlan from '../EditPlan/Connected';
import Page from './Page';

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
};

class Container extends Component<Props> {
  static navigationOptions = () => {
    return {
      header: null,
    };
  };

  onCreate = (date: string) => {
    this.props.navigation.navigate('CreatePlan', {
      date,
    });
  };

  onSchedule = (id: number, title: string) => {
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

const MainCardNavigator = createStackNavigator(
  {
    Container: {
      screen: Container,
    },
    Schedule: {
      screen: Schedule,
    },
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme().mode.header.backgroundColor,
      },
      headerTitleStyle: {
        color: theme().mode.header.text,
      },
      headerTintColor: theme().mode.header.text,
    },
  }
);

export default createStackNavigator(
  {
    MainCardNavigator: {
      screen: MainCardNavigator,
    },
    EditPlan: {
      screen: EditPlan,
    },
  },
  {
    initialRouteName: 'MainCardNavigator',
    headerMode: 'none',
  }
);
