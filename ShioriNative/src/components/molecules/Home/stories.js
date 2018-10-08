import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import Card from "./Card";

storiesOf("molecules/Home", module).add("Card", () => (
  <View style={{ paddingTop: 60 }}>
    <Card
      title="葛西臨海公園"
      about="水上バスで浅草から移動→そのまま海へ行って"
    />
    <Card title="横浜" about="水上バスで浅草から移動→そのまま海へ行って" />
    <Card title="横須賀" about="水上バスで浅草から移動→そのまま海へ行って" />
  </View>
));
