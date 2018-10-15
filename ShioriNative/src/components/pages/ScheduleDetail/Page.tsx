import React, { Component } from "react";
import Card, { Props as CardProps } from "../../molecules/ScheduleDetail/Card";

export interface Props extends CardProps {}

export default class extends Component<Props> {
  render() {
    return <Card {...this.props} />;
  }
}
