import React, { Component } from "react";
import Page, { Props as PageProps } from "./Page";

const data = [
  {
    id: "1",
    title: "新宿駅",
    moveMinutes: 30
  },
  {
    id: "2",
    title: "葛西臨海公園",
    moveMinutes: null
  },
  {
    id: "3",
    title: "葛西臨海公園 水上バス",
    moveMinutes: 120
  },
  {
    id: "4",
    title: "浅草寺二天門前",
    moveMinutes: null
  }
];

interface Props extends PageProps {}

export default class extends Component<Props> {
  static navigationOptions = { title: "葛西臨海公園" };

  render() {
    return <Page data={data} />;
  }
}
