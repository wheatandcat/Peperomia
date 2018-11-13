import { SQLite } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { db } from "../../../lib/db";
import { selectByItemId } from "../../../lib/db/itemDetail";
import { ItemProps } from "../../organisms/Schedule/Cards";
import Page, { Props as PageProps } from "./Page";

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

  onScheduleDetail = (id: string) => {
    this.props.navigation.navigate("ScheduleDetail", { scheduleDetailId: id });
  };

  render() {
    return (
      <Page data={this.state.items} onScheduleDetail={this.onScheduleDetail} />
    );
  }
}
