import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import Page from "./Page";

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default class extends Component<Props> {
  onDismiss = () => {
    this.props.navigation.goBack();
  };

  onSave = (title: string, memo: string, time: number) => {
    const itemId = this.props.navigation.getParam("itemId", "1");
    const priority = this.props.navigation.getParam("priority", "1");
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
