import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import { KIND_PARK } from "../../../lib/getKind";
import Card from "./Card";

const props = {
  id: "1",
  kind: KIND_PARK,
  title: "葛西臨海公園",
  memo: "■行く場所メモ\n・砂浜\n・観覧車\n・水族園",
  moveMinutes: 5
};

storiesOf("molecules/ScheduleDetail", module).add("Card", () => (
  <View style={{ paddingTop: 60 }}>
    <Card {...props} />
  </View>
));
