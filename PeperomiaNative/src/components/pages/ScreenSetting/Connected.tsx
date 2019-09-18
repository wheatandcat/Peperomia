import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import Page from "./Page";

type Props = {
  navigation: NavigationScreenProp<NavigationRoute>;
};

type State = {
  loading: boolean;
  darkMode: boolean;
};

export default class extends Component<Props, State> {
  static navigationOptions = { title: "画面設定" };

  state = {
    darkMode: false,
    loading: false
  };

  onChange = (darkMode: boolean) => {
    this.setState({
      darkMode
    });
  };

  render() {
    return (
      <Page
        darkMode={this.state.darkMode}
        loading={this.state.loading}
        onChange={this.onChange}
      />
    );
  }
}
