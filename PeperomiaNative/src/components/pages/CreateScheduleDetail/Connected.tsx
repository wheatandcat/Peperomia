import { SQLite } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import uuidv1 from "uuid/v1";
import { db } from "../../../lib/db";
import {
  insert as insertItemDetail,
  ItemDetail
} from "../../../lib/db/itemDetail";
import getKind from "../../../lib/getKind";
import Page from "../../templates/CreateScheduleDetail/Page";

export interface State {
  title: string;
  kind: string;
  memo: string;
  moveMinutes: number;
  iconSelected: boolean;
}

interface Props {
  title: string;
  kind: string;
  memo: string;
  moveMinutes: number;
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default class extends Component<Props, State> {
  state = {
    title: this.props.title || "",
    kind: this.props.kind || "",
    memo: this.props.memo || "",
    moveMinutes: this.props.moveMinutes || 0,
    iconSelected: false
  };

  componentDidUpdate() {
    const kind = this.props.navigation.getParam("kind", "");

    if (!kind) {
      return;
    }

    if (this.state.kind !== kind) {
      this.setState({ kind, iconSelected: true });
    }
  }

  onDismiss = () => {
    this.props.navigation.goBack();
  };

  onSave = (title: string, kind: string, memo: string, time: number) => {
    const itemId = this.props.navigation.getParam("itemId", "1");
    const priority = this.props.navigation.getParam("priority", "1");

    db.transaction((tx: SQLite.Transaction) => {
      const itemDetail: ItemDetail = {
        itemId,
        title,
        kind,
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

  onIcons = (title: string) => {
    this.props.navigation.navigate("Icons", {
      kind: getKind(title),
      onSelectIcon: (kind: string) => {
        this.props.navigation.navigate("CreateScheduleDetail", {
          kind: kind
        });
      },
      onDismiss: () => {
        this.props.navigation.navigate("CreateScheduleDetail");
      },
      photo: false
    });
  };

  render() {
    return (
      <Page
        title=""
        memo=""
        kind=""
        time={0}
        iconSelected={this.state.iconSelected}
        onDismiss={this.onDismiss}
        onSave={this.onSave}
        onIcons={this.onIcons}
      />
    );
  }
}
