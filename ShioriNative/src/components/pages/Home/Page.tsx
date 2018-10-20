import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Cards, { Props as CardsProps } from "../../organisms/Home/Cards";

export interface Props extends CardsProps {}

export default class extends Component<Props> {
  render() {
    return (
      <View>
        <View style={{ height: "100%" }}>
          <Cards
            data={this.props.data}
            loading={this.props.loading}
            onSchedule={this.props.onSchedule}
          />
        </View>
        <View
          style={{
            flex: 1,
            right: 0,
            position: "absolute",
            alignItems: "flex-end",
            paddingRight: 25,
            bottom: 30
          }}
        >
          <TouchableOpacity>
            <Ionicons name="ios-add-circle" size={80} color="#4DB6AC" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
