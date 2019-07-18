import React from "react";
import { storiesOf } from "@storybook/react-native";
import { KIND_PARK } from "../../../lib/getKind";
import Card from "./Card";

const props = {
  id: "1",
  kind: KIND_PARK,
  title: "葛西臨海公園",
  place: "西口に9:06分に集合",
  url: "観覧にいく",
  memo: "持ってくるもの\n・弁当\n・水筒\n・ブルーシート",
  moveMinutes: 5
};

storiesOf("molecules/ScheduleDetail", module).add("Card", () => (
  <Card {...props} />
));
