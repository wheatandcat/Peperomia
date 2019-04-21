import React, { Component } from "react";
import { View, Text } from "react-native";

interface Props {}

export default class extends Component<Props> {
  render() {
    return (
      <View
        style={{
          position: "absolute",
          right: 10,
          top: 50
        }}
      >
        <View style={{ right: -300 }}>
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
              borderBottomColor: "#fff",
              right: 10
            }}
          />
        </View>
        <View
          style={{
            width: 330,
            height: 60,
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
