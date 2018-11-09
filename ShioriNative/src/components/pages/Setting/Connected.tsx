import { SQLite } from "expo";
import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Page from "./Page";
import { db } from "../../../lib/db";
import { resetSql } from "../../../lib/db/debug";
import { select as selectItems } from "../../../lib/db/item";

interface Props {}

class Connected extends Component<Props> {
  static navigationOptions = { title: "設定" };

  onResetSQL = () => {
    db.transaction((tx: SQLite.Transaction) => {
      resetSql(tx);
    });
  };

  onData = () => {
    db.transaction((tx: SQLite.Transaction) => {
      selectItems(tx);
    });
  };

  render() {
    return <Page onResetSQL={this.onResetSQL} onData={this.onData} />;
  }
}

export default createStackNavigator({
  Setting: Connected
});
