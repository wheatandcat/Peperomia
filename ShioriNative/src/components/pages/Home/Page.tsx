import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import Cards, { Props as CardsProps } from "../../organisms/Home/Cards";
import { Text } from "../../atoms";

export interface Props extends CardsProps {
  onCreate: () => void;
}

export default class extends Component<Props> {
  render() {
    return (
      <View>
        <View style={{ height: "100%" }}>
          {this.props.data.length > 0 ? (
            <Cards
              data={this.props.data}
              loading={this.props.loading}
              onSchedule={this.props.onSchedule}
            />
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <Text>プランの登録はありません</Text>
            </View>
          )}
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
          <TouchableOpacity onPress={this.props.onCreate} testID="addSchedule">
            <Ionicons name="ios-add-circle" size={80} color="#4DB6AC" />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
