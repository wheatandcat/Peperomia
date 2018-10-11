import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import Card from "./Card";

const props = {
  id: "1",
  title: "池袋駅",
  afterMoveTime: "00:41"
};

storiesOf("molecules/Schedule", module).add("Card", () => (
  <View style={{ paddingTop: 60 }}>
    <Card {...props} />
  </View>
));
