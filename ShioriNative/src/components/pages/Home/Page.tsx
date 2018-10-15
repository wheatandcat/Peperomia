import React, { Component } from "react";
import { View } from "react-native";
import Cards, { Props as CardsProps } from "../../organisms/Home/Cards";

export interface Props extends CardsProps {}

export default class extends Component<Props> {
  render() {
    return (
      <View>
        <Cards
          data={this.props.data}
          loading={this.props.loading}
          onSchedule={this.props.onSchedule}
        />
      </View>
    );
  }
}
