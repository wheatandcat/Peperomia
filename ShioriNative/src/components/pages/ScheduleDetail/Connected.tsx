import { SQLite } from "expo";
import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { KIND_TRAIN } from "../../../lib/getKind";
import { db } from "../../../lib/db";
import { select1st } from "../../../lib/db/itemDetail";
import Page, { Props as PageProps } from "./Page";

const data = {
  id: "1",
  kind: KIND_TRAIN,
  title: "新宿駅",
  memo: "■行く場所メモ\n・砂浜\n・観覧車\n・水族園"
};

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
  state = {
    item: {
      id: "",
      kind: "",
      title: "",
      memo: ""
    }
  };

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

    this.setState({
      item: data
    });
  };

  onDismiss = () => {
    this.props.navigation.goBack();
  };

  render() {
    if (this.state.item.id === "") {
      return null;
    }
    return (
      <Page
        {...this.state.item}
        onDismiss={this.onDismiss}
        onOpenActionSheet={() => {}}
      />
    );
  }
}
