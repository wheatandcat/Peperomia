import React, { Component } from "react";
import { StyleSheet, View, Text } from "react-native";
import { whenIPhoneSE } from "../../../lib/responsive";
import theme from "../../../config/theme";

interface Props {}

export default class extends Component<Props> {
  render() {
    return (
      <View style={styles.root}>
        <View style={{ right: whenIPhoneSE(-250, -300) }}>
          <View style={styles.tips} />
        </View>
        <View style={styles.tipsContainer}>
          <Text style={{ fontSize: whenIPhoneSE(12, 14) }}>
            <Text style={{ fontSize: whenIPhoneSE(17, 20), fontWeight: "600" }}>
              {" "}
              +{" "}
            </Text>
            ボタンをタッチして予定を作成しよう！
          </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  root: {
    position: "absolute",
    right: 10,
    top: 50
  },
  tips: {
    width: 0,
    height: 0,
    backgroundColor: "transparent",
    borderStyle: "solid",
    borderRightWidth: 20,
    borderTopWidth: 20,
    transform: [{ rotate: "180deg" }],
    borderRightColor: "transparent",
    borderTopColor: theme.color.white,
    borderBottomColor: theme.color.white,
    right: 10
  },
  tipsContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: whenIPhoneSE(280, 330),
    height: whenIPhoneSE(40, 55),
    backgroundColor: theme.color.white,
    borderWidth: 0,
    paddingHorizontal: whenIPhoneSE(12, 15)
  }
});
