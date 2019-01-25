import React from "react";
import { Image } from "react-native";
import { View, Button, Text } from "react-native-ui-lib";

const guide = require(`../../../img/icon.png`);

export interface Props {
  onNext: () => void;
}

export default (props: Props) => (
  <View style={{ width: 290 }}>
    <View
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 25,
        height: 280,
        backgroundColor: "#5BC062"
      }}
    >
      <View height={100}>
        <Text style={{ color: "#ffffff", fontSize: 28, fontWeight: "bold" }}>
          予定を共有しよう
        </Text>
        <View style={{ paddingTop: 15 }}>
          <Text style={{ color: "#ffffff", fontSize: 15 }}>
            アプリ、メール、メッセージ、メモ。
          </Text>
          <View style={{ paddingTop: 10 }}>
            <Text style={{ color: "#ffffff", fontSize: 15 }}>
              どんな方法でも共有できます。
            </Text>
          </View>
        </View>
      </View>
      <Image
        source={guide}
        style={{
          right: 90,
          bottom: 15,
          position: "absolute",
          width: 125,
          height: 125
        }}
      />
    </View>
    <View
      style={{
        backgroundColor: "#ffffff",
        height: "25%",
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        padding: 25,
        paddingTop: 30
      }}
    >
      <Button
        text60
        label="はじめる"
        backgroundColor="#5BC062"
        onPress={props.onNext}
        testID="guidShareNext"
      />
    </View>
  </View>
);
