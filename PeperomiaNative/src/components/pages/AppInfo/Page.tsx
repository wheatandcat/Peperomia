import React, { Component } from "react";
import { StyleSheet, View, Text, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AppIntroSlider from "react-native-app-intro-slider";
import { whenIPhoneSE } from "../../../lib/responsive";
import theme from "../../../config/theme";

interface Props {
  onDone: () => void;
}

const styles = StyleSheet.create({
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, .2)",
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center"
  }
});

type Slide = {
  key: string;
  title: string;
  text: string;
  image: any;
  imageWidth: number;
  titleColor: string;
  textColor: string;
  backgroundColor: string;
};

const slides: Slide[] = [
  {
    key: "step1",
    title: "予定を管理",
    text: "ペペロミアは予定管理アプリです\n簡単な操作で予定を作成",
    image: require("../../../img/intro_home.png"),
    imageWidth: 250,
    titleColor: theme().color.main,
    textColor: theme().color.main,
    backgroundColor: theme().color.lightGreen
  },
  {
    key: "step2",
    title: "予定を整理",
    text:
      "タイトルをつけると自動でアイコンを設定\n見やすい予定表を作成しよう！",
    image: require("../../../img/intro_plan2.png"),
    imageWidth: 250,
    titleColor: theme().color.lightGreen,
    textColor: theme().color.lightGreen,
    backgroundColor: theme().color.main
  },
  {
    key: "step3",
    title: "予定を共有",
    text: "作成した予定は\nブラウザから誰にでも共有可能",
    image: require("../../../img/intro_share.png"),
    imageWidth: 300,
    titleColor: theme().color.main,
    textColor: theme().color.main,
    backgroundColor: theme().color.lightGreen
  },
  {
    key: "step4",
    title: "ようこそ！！",
    text: "ペペロミアを使って予定を作っていこう！",
    image: require("../../../img/icon.png"),
    imageWidth: 200,
    titleColor: theme().color.white,
    textColor: theme().color.highLightGray,
    backgroundColor: theme().color.main
  }
];

export default class extends Component<Props> {
  _renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-arrow-round-forward"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{
            backgroundColor: "transparent"
          }}
        />
      </View>
    );
  };

  _renderDoneButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Ionicons
          name="md-checkmark"
          color="rgba(255, 255, 255, .9)"
          size={24}
          style={{
            backgroundColor: "transparent"
          }}
        />
      </View>
    );
  };

  _renderItem = ({ item }: { item: Slide }) => (
    <View
      style={{
        backgroundColor: item.backgroundColor,
        height: "100%",
        paddingTop: whenIPhoneSE(30, 150)
      }}
    >
      <View
        style={{
          paddingTop: 70,
          height: 300,
          paddingLeft: 10,
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Image
          source={item.image}
          style={{ width: item.imageWidth }}
          resizeMode="contain"
        />
      </View>
      <View
        style={{
          justifyContent: "center",
          paddingLeft: 50,
          paddingTop: 50
        }}
      >
        <Text
          style={{
            fontSize: 25,
            fontWeight: "600",
            color: item.titleColor
          }}
        >
          {item.title}
        </Text>
      </View>
      <View
        style={{
          justifyContent: "center",
          alignItems: "flex-start",
          paddingLeft: 50,
          paddingTop: 20
        }}
      >
        {item.text.split("\n").map((val: string) => (
          <Text
            style={{
              fontSize: 16,
              color: item.textColor,
              paddingBottom: 5
            }}
            key={val}
          >
            {val}
          </Text>
        ))}
      </View>
    </View>
  );

  _onDone = () => {
    this.props.onDone();
  };

  render() {
    return (
      <AppIntroSlider
        slides={slides}
        onDone={this._onDone}
        renderItem={this._renderItem}
        renderDoneButton={this._renderDoneButton}
        renderNextButton={this._renderNextButton}
      />
    );
  }
}
