import React, { Component } from "react";
import { View, Text } from "react-native";

interface Props {}

export default class extends Component<Props> {
  render() {
    return (
      <View
        style={{
          position: "absolute",
          right: 15,
          top: 100
        }}
      >
        <View style={{ paddingLeft: 285 }}>
          <View
            style={{
              width: 0,
              height: 0,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderRightWidth: 20,
              borderTopWidth: 20,
              transform: [{ rotate: "180deg" }],
              borderRightColor: "transparent",
              borderTopColor: "#fff",
              right: 15
            }}
          />
        </View>
        <View
          style={{
            width: 310,
            height: 50,
            backgroundColor: "#fff",
            borderWidth: 0,
            padding: 15
          }}
        >
          <Text>「+」ボタンをタッチして予定を作成しよう！</Text>
        </View>
      </View>
    );
  }
}
