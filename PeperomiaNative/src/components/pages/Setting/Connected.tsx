import { SQLite } from "expo";
import React, { Component } from "react";
import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import Page from "./Page";
import { db } from "../../../lib/db";
import { deleteSql, resetSql, deleteUserSql } from "../../../lib/db/debug";
import { select as selectItems } from "../../../lib/db/item";
import { select as selectItemDetailds } from "../../../lib/db/itemDetail";
import Tos from "../Tos/Page";
import Policy from "../Policy/Page";
import Feedback from "../Feedback/Connected";

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

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

  onTos = () => {
    this.props.navigation.navigate("Tos");
  };

  onPolicy = () => {
    this.props.navigation.navigate("Policy");
  };

  onFeedback = () => {
    this.props.navigation.navigate("Feedback");
  };

  render() {
    return (
      <Page
        onResetSQL={this.onResetSQL}
        onData={this.onData}
        onDeleteSQL={this.onDeleteSQL}
        onDeleteUser={this.onDeleteUser}
        onTos={this.onTos}
        onPolicy={this.onPolicy}
        onFeedback={this.onFeedback}
      />
    );
  }
}

export default createStackNavigator({
  Setting: Connected,
  Tos: Tos,
  Policy: Policy,
  Feedback: Feedback
});
