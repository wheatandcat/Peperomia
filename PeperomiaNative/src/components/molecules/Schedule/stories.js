import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native";
import { KIND_TRAIN } from "../../../lib/getKind";
import Card from "./Card";
import ActionButton from "./ActionButton";

const props = {
  id: "1",
  kind: KIND_TRAIN,
  title: "新宿駅",
  moveMinutes: 30,
  end: false
};

storiesOf("molecules/Schedule", module)
  .add("Card", () => (
    <View style={{ paddingTop: 60 }}>
      <Card {...props} />
    </View>
  ))
  .add("ActionButton", () => (
    <View style={{ paddingTop: 50 }}>
      <ActionButton />
    </View>
  ));
