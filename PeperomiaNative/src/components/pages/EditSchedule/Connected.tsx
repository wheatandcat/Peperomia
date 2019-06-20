import { SQLite } from "expo-sqlite";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import uuidv1 from "uuid/v1";
import { db } from "../../../lib/db";
import { selectByItemId } from "../../../lib/db/itemDetail";
import { ItemProps } from "../../organisms/Schedule/Cards";
import Page from "../../templates/CreateSchedule/Page";

interface Props {
  title: string;
  items: ItemProps[];
  navigation: NavigationScreenProp<NavigationRoute>;
  onShow: () => void;
}

export interface State {
  items: ItemProps[];
  refresh: string;
}

export default class extends Component<Props, State> {
  state = { items: this.props.items || [], refresh: "0" };

  componentDidUpdate() {
    const refresh = this.props.navigation.getParam("refresh", "0");

    if (refresh !== this.state.refresh) {
      const itemId = this.props.navigation.getParam("itemId", "1");
      db.transaction((tx: SQLite.Transaction) => {
        selectByItemId(tx, itemId, this.setItems);
      });
      this.setState({ refresh });
    }
  }

  setParams = (data: any, error: any) => {
    if (error) {
      return;
    }

    const itemId = this.props.navigation.getParam("itemId", "1");
    const mode = this.props.navigation.getParam("mode", "create");

    this.props.navigation.setParams({
      title: data.title,
      itemId,
      mode
    });
  };

  setItems = (data: any, error: any) => {
    if (error) {
      return;
    }

    this.setState({ items: data });
  };

  onCreateScheduleDetail = () => {
    const itemId = this.props.navigation.getParam("itemId", "1");
    this.props.navigation.navigate("CreateScheduleDetail", {
      itemId,
      onSave: () => {
        this.props.navigation.navigate("CreateSchedule", {
          itemId: itemId,
          refresh: uuidv1()
        });
      }
    });
  };

  onScheduleDetail = (id: string) => {
    this.props.navigation.navigate("ScheduleDetail", {
      scheduleDetailId: id,
      priority: this.state.items.length + 1
    });
  };

  render() {
    return (
      <Page
        data={this.state.items}
        onScheduleDetail={this.onScheduleDetail}
        onCreateScheduleDetail={this.onCreateScheduleDetail}
      />
    );
  }
}
