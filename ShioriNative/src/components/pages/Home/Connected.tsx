import React, { Component } from "react";
import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import Schedule from "../Schedule/Connected";
import ScheduleDetail from "../ScheduleDetail/Connected";
import Page, { Props as PageProps } from "./Page";

const data = [
  {
    id: "1",
    title: "葛西臨海公園",
    about: "水上バスで浅草から移動→そのまま海へ行って"
  },
  {
    id: "2",
    title: "横浜",
    about: "水上バスで浅草から移動→そのまま海へ行って"
  },
  {
    id: "3",
    title: "横須賀",
    about: "水上バスで浅草から移動→そのまま海へ行って"
  }
];

interface Props extends PageProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

class HomeScreen extends Component<Props> {
  static navigationOptions = {
    title: "マイプラン"
  };

  onSchedule = () => {
    this.props.navigation.navigate("Schedule");
  };

  render() {
    return <Page data={data} loading={false} onSchedule={this.onSchedule} />;
  }
}

const MainCardNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Schedule: {
    screen: Schedule
  }
});

export default createStackNavigator(
  {
    MainCardNavigator: {
      screen: MainCardNavigator
    },
    ScheduleDetail: {
      screen: ScheduleDetail
    }
  },
  {
    initialRouteName: "MainCardNavigator",
    mode: "modal",
    headerMode: "none"
  }
);
