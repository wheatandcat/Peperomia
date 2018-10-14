import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import {
  KIND_PARK,
  KIND_TRAIN,
  KIND_SHIP,
  KIND_DEFAULT
} from "../../../lib/getKind";
import Card from "./Card";

const props = {
  id: "1",
  kind: KIND_TRAIN,
  title: "新宿駅",
  moveMinutes: 30,
  end: false
};

const props2 = {
  id: "2",
  kind: KIND_PARK,
  title: "葛西臨海公園",
  moveMinutes: null,
  end: false
};

const props3 = {
  id: "3",
  kind: KIND_SHIP,
  title: "葛西臨海公園 水上バス",
  moveMinutes: 120,
  end: false
};

const props4 = {
  id: "4",
  kind: KIND_DEFAULT,
  title: "浅草寺二天門前",
  moveMinutes: null,
  end: true
};

storiesOf("molecules/Schedule", module).add("Card", () => (
  <View style={{ paddingTop: 60 }}>
    <Card {...props} />
    <Card {...props2} />
    <Card {...props3} />
    <Card {...props4} />
  </View>
));
