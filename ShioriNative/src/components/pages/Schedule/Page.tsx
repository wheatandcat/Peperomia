import React, { Component } from "react";
import { View, Text } from "react-native";
import Cards, { Props as CardsProps } from "../../organisms/Schedule/Cards";

export interface Props extends CardsProps {}
export default class extends Component<Props> {
  render() {
    return (
      <View style={{ backgroundColor: "#ffffff" }}>
        <Cards data={this.props.data} />
      </View>
    );
  }
}
