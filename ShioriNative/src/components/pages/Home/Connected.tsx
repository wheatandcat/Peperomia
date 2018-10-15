import React, { Component } from "react";
import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import { Button, Text, View } from "react-native";
import Schedule from "../Schedule/Connected";
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

export default createStackNavigator({
  Home: {
    screen: HomeScreen
  },
  Schedule: {
    screen: Schedule
  }
});
