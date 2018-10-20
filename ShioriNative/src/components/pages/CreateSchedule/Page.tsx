import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export interface Props {}

export default class extends Component<Props> {
  render() {
    return (
      <View style={{ backgroundColor: "#ffffff" }}>
        <View style={{ height: "100%", alignItems: "center", paddingTop: 50 }}>
          <Text>まだ予定がありません</Text>
        </View>
        <View
          style={{
            position: "absolute",
            bottom: 80,
            width: "100%",
            padding: 45
          }}
        >
          <View
            style={{
              alignItems: "center",
              backgroundColor: "#8492A6",
              paddingHorizontal: 40,
              paddingVertical: 30,
              borderRadius: 20
            }}
          >
            <Text style={{ color: "#ffffff", fontSize: 18 }}>
              まずは、予定を追加しよう
            </Text>
          </View>
          <View
            style={{
              width: 0,
              height: 0,
              marginLeft: 230,
              backgroundColor: "transparent",
              borderStyle: "solid",
              borderLeftWidth: 20,
              borderRightWidth: 0,
              borderTopWidth: 20,
              borderLeftColor: "transparent",
              borderRightColor: "transparent",
              borderTopColor: "#8492A6"
            }}
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
