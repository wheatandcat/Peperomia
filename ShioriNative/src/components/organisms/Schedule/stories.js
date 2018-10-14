import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import Cards from "./Cards";

const props = [
  {
    id: "1",
    title: "新宿駅",
    moveMinutes: 30
  },
  {
    id: "2",
    title: "葛西臨海公園",
    moveMinutes: null
  },
  {
    id: "3",
    title: "葛西臨海公園 水上バス",
    moveMinutes: 120
  },
  {
    id: "4",
    title: "浅草寺二天門前",
    moveMinutes: null
  }
];

storiesOf("organisms/Schedule", module).add("Cards", () => (
  <View style={{ paddingTop: 60 }}>
    <Cards data={props} />
  </View>
));
