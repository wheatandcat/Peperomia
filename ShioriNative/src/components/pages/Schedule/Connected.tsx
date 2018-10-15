import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import Page, { Props as PageProps } from "./Page";

const list = [
  {
    id: "1",
    data: [
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
    ]
  },
  {
    id: "2",
    data: [
      {
        id: "1",
        title: "市ヶ谷駅",
        moveMinutes: null
      },
      {
        id: "2",
        title: "市ヶ谷フィッシュセンター",
        moveMinutes: 10
      },
      {
        id: "3",
        title: "新宿駅",
        moveMinutes: 10
      },
      {
        id: "4",
        title: "TOHOシネマズ 新宿",
        moveMinutes: null
      }
    ]
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
    const scheduleId = this.props.navigation.getParam("scheduleId", "1");

    const data = list.find(item => item.id === scheduleId);
    if (!data) {
      return null;
    }

    return <Page data={data.data} onScheduleDetail={this.onScheduleDetail} />;
  }
}
