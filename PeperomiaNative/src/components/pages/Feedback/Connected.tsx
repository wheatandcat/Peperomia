import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { Alert } from "react-native";
import Page from "./Page";
import theme from "../../../config/theme";

interface Props {
  navigation: NavigationScreenProp<NavigationRoute>;
}

interface State {
  isOpen: boolean;
  loading: boolean;
}

export default class extends Component<Props, State> {
  static navigationOptions = {
    title: "フィードバック",
    headerBackTitle: ""
  };

  state = {
    isOpen: false,
    loading: false
  };

  onFeedback = async (message: string) => {
    this.setState({
      loading: true
    });

    const response = await fetch(
      encodeURI(
        `https://us-central1-single-kayak-229714.cloudfunctions.net/SendFeedback?message=${message}`
      )
    );

    if (!response.ok) {
      Alert.alert("アクセスに失敗しました", "");
      this.setState({
        loading: false
      });
      return;
    }

    this.setState({ isOpen: true, loading: false });
  };

  onClose = () => {
    this.setState({ isOpen: false });
    this.props.navigation.goBack();
  };

  render() {
    return (
      <Page
        isOpen={this.state.isOpen}
        loading={this.state.loading}
        onFeedback={this.onFeedback}
        onClose={this.onClose}
      />
    );
  }
}
