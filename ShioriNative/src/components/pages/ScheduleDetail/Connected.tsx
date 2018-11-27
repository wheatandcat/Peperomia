import { SQLite } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { db } from "../../../lib/db";
import { select1st } from "../../../lib/db/itemDetail";
import Page, { Props as PageProps } from "./Page";

interface State {
  item: {
    id: string;
    kind: string;
    title: string;
    memo: string;
  };
}

interface Props extends PageProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default class extends Component<Props, State> {
  state = { item: { id: "", kind: "", title: "", memo: "" } };

  componentDidMount() {
    const scheduleDetailId = this.props.navigation.getParam(
      "scheduleDetailId",
      "1"
    );
    db.transaction((tx: SQLite.Transaction) => {
      select1st(tx, scheduleDetailId, this.setItem);
    });
  }

  setItem = (data: any, error: any) => {
    if (error) {
      return;
    }

    this.setState({ item: data });
  };

  onDismiss = () => {
    this.props.navigation.goBack();
  };

  onCreateScheduleDetail = () => {
    const scheduleDetailId = this.props.navigation.getParam(
      "scheduleDetailId",
      "1"
    );

    this.props.navigation.navigate("EditScheduleDetail", {
      scheduleDetailId
    });
  };

  render() {
    if (this.state.item.id === "") {
      return null;
    }
    return (
      <Page
        {...this.state.item}
        onDismiss={this.onDismiss}
        onCreateScheduleDetail={this.onCreateScheduleDetail}
      />
    );
  }
}
