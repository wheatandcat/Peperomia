import { SQLite, Constants } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import uuidv1 from "uuid/v1";
import { db } from "../../../lib/db";
import {
  insert as insertItemDetail,
  ItemDetail
} from "../../../lib/db/itemDetail";
import Page from "../../templates/CreateScheduleDetail/Page";

export interface State {
  title: string;
  memo: string;
  moveMinutes: number;
}

interface Props {
  title: string;
  memo: string;
  moveMinutes: number;
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default class extends Component<Props, State> {
  state = {
    title: this.props.title || "",
    memo: this.props.memo || "",
    moveMinutes: this.props.moveMinutes || 0
  };

  onDismiss = () => {
    this.props.navigation.goBack();
  };

  onSave = (title: string, memo: string, time: number) => {
    const itemId = this.props.navigation.getParam("itemId", "1");
    const priority = this.props.navigation.getParam("priority", "1");

    db.transaction((tx: SQLite.Transaction) => {
      const itemDetail: ItemDetail = {
        itemId,
        title,
        memo,
        moveMinutes: time,
        priority: Number(priority)
      };

      insertItemDetail(tx, itemDetail, this.save);
    });
  };

  save = () => {
    const itemId = this.props.navigation.getParam("itemId", "1");

    this.props.navigation.navigate("CreateSchedule", {
      itemId,
      refresh: uuidv1()
    });
  };

  render() {
    return (
      <Page
        title=""
        memo=""
        time={0}
        onDismiss={this.onDismiss}
        onSave={this.onSave}
      />
    );
  }
}
