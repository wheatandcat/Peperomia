import React, { Component } from "react";
import { View, Text } from "react-native";
import { whenIPhoneSE } from "../../../lib/responsive";

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
        <View style={{ right: whenIPhoneSE(-250, -300) }}>
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
            width: whenIPhoneSE(280, 330),
            height: whenIPhoneSE(40, 60),
            backgroundColor: "#fff",
            borderWidth: 0,
            padding: whenIPhoneSE(12, 15)
          }}
        >
          <Text style={{ fontSize: whenIPhoneSE(12, 14) }}>
            「+」ボタンをタッチして予定を作成しよう！
          </Text>
        </View>
      </View>
    );
  }
}
