import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { KIND_PARK, KIND_ART_MUSEUM, KIND_COFFEE } from "../../../lib/getKind";
import Page from "./Page";

const calendars = [
  {
    kind: KIND_COFFEE,
    date: "2019-10-03"
  },
  {
    kind: KIND_PARK,
    date: "2019-10-14"
  },
  {
    kind: KIND_ART_MUSEUM,
    date: "2019-10-24"
  }
];

storiesOf("pages", module).add("Calendars", () => (
  <View style={{ paddingTop: 60 }}>
    <Page calendars={calendars} onCreate={() => null} onSchedule={() => null} />
  </View>
));
