import { SQLite } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { db } from "../../../lib/db";
import {
  update as updateItemDetail,
  ItemDetail
} from "../../../lib/db/itemDetail";
import Page from "../../templates/CreateScheduleDetail/Page";

export interface State {
  title: string;
  memo: string;
  moveMinutes: number;
}

interface Props {
  id: number;
  title: string;
  memo: string;
  moveMinutes: number;
  navigation: NavigationScreenProp<NavigationRoute>;
  onShow: (reload: boolean) => void;
}

export default class extends Component<Props, State> {
  state = {
    title: this.props.title || "",
    memo: this.props.memo || "",
    moveMinutes: this.props.moveMinutes || 0
  };

  onDismiss = () => {
    this.props.onShow(false);
  };

  onSave = (title: string, memo: string, time: number) => {
    db.transaction((tx: SQLite.Transaction) => {
      const itemDetail: ItemDetail = {
        id: this.props.id,
        title,
        memo,
        moveMinutes: time,
        priority: 0,
        itemId: 0
      };

      updateItemDetail(tx, itemDetail, this.save);
    });
  };

  save = () => {
    this.props.onShow(true);
  };

  render() {
    return (
      <Page
        title={this.state.title}
        memo={this.state.memo}
        time={this.state.moveMinutes}
        onDismiss={this.onDismiss}
        onSave={this.onSave}
      />
    );
  }
}
