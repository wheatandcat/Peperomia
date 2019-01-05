import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import { KIND_TRAIN } from "../../../lib/getKind";
import Page from "./Page";

const props = {
  id: "1",
  kind: KIND_TRAIN,
  title: "新宿駅",
  memo: "■行く場所メモ\n・砂浜\n・観覧車\n・水族園"
};

storiesOf("pages", module).add("ScheduleDetail", () => (
  <View style={{ paddingTop: 60 }}>
    <Page {...props} />
  </View>
));
