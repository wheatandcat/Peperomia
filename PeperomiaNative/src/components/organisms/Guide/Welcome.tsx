import React from "react";
import { View, Button, Text } from "react-native-ui-lib";

export interface Props {
  onNext: () => void;
}

export default (props: Props) => (
  <View>
    <View
      style={{
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        padding: 25,
        height: "75%",
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
      />
    </View>
  </View>
);
