import { SQLite } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { db } from "../../../lib/db";
import { selectByItemId } from "../../../lib/db/itemDetail";
import { ItemProps } from "../../organisms/Schedule/Cards";
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

interface State {
  items: ItemProps[];
}

export default class extends Component<Props, State> {
  static navigationOptions = { title: "葛西臨海公園" };

  state = { items: [] };

  componentDidMount() {
    const scheduleId = this.props.navigation.getParam("scheduleId", "1");
    db.transaction((tx: SQLite.Transaction) => {
      selectByItemId(tx, scheduleId, this.setItems);
    });
  }

  setItems = (data: any, error: any) => {
    if (error) {
      return;
    }

    this.setState({
      items: data
    });
  };

  onScheduleDetail = () => {
    this.props.navigation.navigate("ScheduleDetail"), { mode: "modal" };
  };

  render() {
    return (
      <Page data={this.state.items} onScheduleDetail={this.onScheduleDetail} />
    );
  }
}
