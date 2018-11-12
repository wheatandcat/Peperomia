import React, { Component } from "react";
import { SafeAreaView } from "react-native";
import Card, { Props as CardProps } from "../../molecules/ScheduleDetail/Card";

export interface Props extends CardProps {}

export default class extends Component<Props> {
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <Card {...this.props} />
      </SafeAreaView>
    );
  }
}
