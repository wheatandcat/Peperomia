import { SQLite } from "expo";
import React, { Component } from "react";
import { createStackNavigator } from "react-navigation";
import Page from "./Page";
import { save } from "../../../lib/firebase";
import { db } from "../../../lib/db";
import { deleteSql, resetSql, deleteUserSql } from "../../../lib/db/debug";
import { select as selectItems } from "../../../lib/db/item";
import { select as selectItemDetailds } from "../../../lib/db/itemDetail";
interface Props {}

class Connected extends Component<Props> {
  static navigationOptions = { title: "設定" };

  onDeleteSQL = () => {
    db.transaction((tx: SQLite.Transaction) => {
      deleteSql(tx);
    });
  };

  onResetSQL = () => {
    db.transaction((tx: SQLite.Transaction) => {
      resetSql(tx);
    });
  };

  onData = () => {
    db.transaction((tx: SQLite.Transaction) => {
      selectItems(tx, console.log);
      selectItemDetailds(tx, console.log);
    });
  };

  onDeleteUser = () => {
    db.transaction((tx: SQLite.Transaction) => {
      deleteUserSql(tx);
    });
  };

  render() {
    return (
      <Page
        onResetSQL={this.onResetSQL}
        onData={this.onData}
        onDeleteSQL={this.onDeleteSQL}
        onDeleteUser={this.onDeleteUser}
      />
    );
  }
}

export default createStackNavigator({
  Setting: Connected
});
