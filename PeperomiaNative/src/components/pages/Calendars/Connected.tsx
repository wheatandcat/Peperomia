import React, { Component } from "react";
import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import { KIND_PARK, KIND_ART_MUSEUM, KIND_COFFEE } from "../../../lib/getKind";
import theme from "../../../config/theme";
import Page from "./Page";

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
};

class Container extends Component<Props> {
  static navigationOptions = () => {
    return {
      title: "カレンダー",
      headerTitleStyle: {
        color: theme().mode.header.text
      },
      headerTintColor: theme().mode.header.text,
      headerStyle: {
        backgroundColor: theme().mode.header.backgroundColor
      }
    };
  };

  render() {
    const items = [
      {
        kind: KIND_COFFEE,
        date: "2019-10-03"
      },
      {
        kind: KIND_PARK,
        date: "2019-10-14"
      },
      {
        kind: KIND_ART_MUSEUM,
        date: "2019-10-24"
      }
    ];

    return <Page items={items} />;
  }
}

export default createStackNavigator(
  {
    Calendars: Container
  },
  {
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: theme().mode.header.backgroundColor
      },
      headerTitleStyle: {
        color: theme().mode.header.text
      },
      headerTintColor: theme().mode.header.text
    }
  }
);
