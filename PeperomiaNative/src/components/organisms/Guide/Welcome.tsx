import React from "react";
import { Image } from "react-native";
import { View, Button, Text } from "react-native-ui-lib";

const guide = require(`../../../img/guide.png`);

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
          ようこそ！
        </Text>
        <View style={{ paddingTop: 15 }}>
          <Text style={{ color: "#ffffff", fontSize: 15 }}>
            ペペロミアは予定共有アプリです。
          </Text>
        </View>
      </View>
      <Image
        source={guide}
        style={{
          right: 80,
          bottom: 0,
          position: "absolute",
          width: 125,
          height: 150
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
        label="次へ"
        backgroundColor="#5BC062"
        onPress={props.onNext}
        testID="guidWelcomeNext"
      />
    </View>
  </View>
);
