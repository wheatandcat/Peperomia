import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { KIND_PARK } from "../../../lib/getKind";
import Card from "./Card";

storiesOf("molecules/Home", module).add("Card", () => (
  <View style={{ paddingTop: 60 }}>
    <Card
      title="葛西臨海公園"
      about="水上バスで浅草から移動→そのまま海へ行って"
      kind={KIND_PARK}
      image=""
      about="駅→公園"
    />
  </View>
));
