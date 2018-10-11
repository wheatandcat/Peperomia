import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import Page from "./Page";

const props = [
  {
    id: "1",
    title: "池袋駅",
    afterMoveTime: "00:41"
  },
  {
    id: "2",
    title: "葛西臨海公園",
    afterMoveTime: null
  },
  {
    id: "3",
    time: "16:55",
    title: "葛西臨海公園 水上バス",
    afterMoveTime: "02:00"
  },
  {
    id: "4",
    title: "浅草寺二天門前",
    afterMoveTime: null
  }
];

storiesOf("pages", module).add("Schedule", () => (
  <View style={{ paddingTop: 60 }}>
    <Page data={props} loading={false} />
  </View>
));
