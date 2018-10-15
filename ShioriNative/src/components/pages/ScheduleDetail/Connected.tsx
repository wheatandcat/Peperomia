import React, { Component } from "react";
import { NavigationScreenProp, NavigationRoute } from "react-navigation";
import { KIND_TRAIN } from "../../../lib/getKind";
import Page, { Props as PageProps } from "./Page";

const data = {
  id: "1",
  kind: KIND_TRAIN,
  title: "新宿駅",
  memo: "■行く場所メモ\n・砂浜\n・観覧車\n・水族園"
};
interface Props extends PageProps {
  navigation: NavigationScreenProp<NavigationRoute>;
}

export default class extends Component<Props> {
  onDismiss = () => {
    this.props.navigation.goBack();
  };

  render() {
    return <Page {...data} onDismiss={this.onDismiss} />;
  }
}
