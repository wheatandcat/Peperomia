import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import Page, { Props as PageProps } from "./Page";

const data = [
  {
    id: "1",
    title: "新宿駅",
    moveMinutes: 30
  },
  {
    id: "2",
    title: "葛西臨海公園",
    moveMinutes: null
  },
  {
    id: "3",
    title: "葛西臨海公園 水上バス",
    moveMinutes: 120
  },
  {
    id: "4",
    title: "浅草寺二天門前",
    moveMinutes: null
  }
];

interface Props extends PageProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default class extends Component<Props> {
  static navigationOptions = { title: "葛西臨海公園" };

  onScheduleDetail = () => {
    this.props.navigation.navigate("ScheduleDetail"), { mode: "modal" };
  };

  render() {
    return <Page data={data} onScheduleDetail={this.onScheduleDetail} />;
  }
}
