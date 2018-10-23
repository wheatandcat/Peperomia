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

  render() {
    return <Page title="" memo="" time={0} onDismiss={this.onDismiss} />;
  }
}
