import { SQLite } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { db } from "../../../lib/db";
import { selectByItemId, ItemDetail } from "../../../lib/db/itemDetail";
import Page from "./Page";

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
  onAdd: (items: ItemDetail[]) => void;
  onSort: (items: ItemDetail[]) => void;
  onDelete: () => void;
}

interface State {
  items: ItemDetail[];
  refresh: string;
}

export default class extends Component<Props, State> {
  state = { items: [], refresh: "" };

  componentDidMount() {
    const itemId = this.props.navigation.getParam("itemId", "1");

    db.transaction((tx: SQLite.Transaction) => {
      selectByItemId(tx, itemId, this.setItems);
    });
  }

  componentDidUpdate() {
    const refresh = this.props.navigation.getParam("refresh", "");
    const itemId = this.props.navigation.getParam("itemId", "1");

    if (this.state.refresh === refresh) {
      return;
    }

    this.setState({ refresh: refresh });
    db.transaction((tx: SQLite.Transaction) => {
      selectByItemId(tx, itemId, this.setItems);
    });
  }

  setItems = (data: any, error: any) => {
    if (error) {
      return;
    }

    this.props.navigation.setParams({
      items: data
    });
    this.setState({ items: data });
  };

  onScheduleDetail = (id: string) => {
    this.props.navigation.navigate("ScheduleDetail", { scheduleDetailId: id });
  };

  render() {
    return (
      <Page
        data={this.state.items}
        onScheduleDetail={this.onScheduleDetail}
        onAdd={() => this.props.onAdd(this.state.items)}
        onSort={() => this.props.onSort(this.state.items)}
        onDelete={this.props.onDelete}
      />
    );
  }
}
