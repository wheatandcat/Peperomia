import { SQLite, Google } from "expo";
import * as firebase from "firebase";
import React, { Component } from "react";
import {
  createStackNavigator,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import { AsyncStorage } from "react-native";
import Page from "./Page";
import { firebaseConfig } from "../../../config/firebase";
import { db } from "../../../lib/db";
import { deleteSql, resetSql, deleteUserSql } from "../../../lib/db/debug";
import { select as selectItems } from "../../../lib/db/item";
import { select as selectItemDetailds } from "../../../lib/db/itemDetail";
import Tos from "../Tos/Page";
import Policy from "../Policy/Page";
import Feedback from "../Feedback/Connected";
import SignIn from "../SignIn/Connected";

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

    AsyncStorage.removeItem("FIRST_CRAEATE_ITEM");
  };

  onShowSQL = () => {};

  onTos = () => {
    this.props.navigation.navigate("Tos");
  };

  onPolicy = () => {
    this.props.navigation.navigate("Policy");
  };

  onFeedback = () => {
    this.props.navigation.navigate("Feedback");
  };

  onSignIn = () => {
    this.props.navigation.navigate("SignIn");
  };

  render() {
    return (
      <Page
        onResetSQL={this.onResetSQL}
        onData={this.onData}
        onDeleteSQL={this.onDeleteSQL}
        onDeleteUser={this.onDeleteUser}
        onShowSQL={this.onShowSQL}
        onTos={this.onTos}
        onPolicy={this.onPolicy}
        onFeedback={this.onFeedback}
        onSignIn={this.onSignIn}
      />
    );
  }
}

export default createStackNavigator({
  Setting: Connected,
  Tos: Tos,
  Policy: Policy,
  Feedback: Feedback,
  SignIn: SignIn
});
