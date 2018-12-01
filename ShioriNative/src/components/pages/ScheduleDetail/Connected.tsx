import { SQLite } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { db } from "../../../lib/db";
import { select1st } from "../../../lib/db/itemDetail";
import Page from "./Page";

interface State {
  item: {
    id: string;
    kind: string;
    title: string;
    memo: string;
    moveMinutes: number;
  };
}

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
  onEdit: (title: string, memo: string, moveMinutes: number) => void;
}

export default class extends Component<Props, State> {
  state = { item: { id: "", kind: "", title: "", memo: "", moveMinutes: 0 } };

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
    console.log(this);

    const { title, memo, moveMinutes } = this.state.item;
    this.props.onEdit(title, memo, moveMinutes);
  };

  render() {
    if (this.state.item.id === "") {
      return null;
    }
    return (
      <Page
        {...this.state.item}
        onDismiss={this.onDismiss}
        onCreateScheduleDetail={this.onCreateScheduleDetail.bind(this)}
      />
    );
  }
}
