import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import { KIND_PARK } from "../../../lib/getKind";
import Cards from "./Cards";

const props = [
  {
    id: "1",
    title: "新宿駅",
    kind: KIND_PARK,
    moveMinutes: 30
  },
  {
    id: "2",
    title: "葛西臨海公園",
    kind: KIND_PARK,
    moveMinutes: null
  },
  {
    id: "3",
    title: "葛西臨海公園 水上バス",
    kind: KIND_PARK,
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
