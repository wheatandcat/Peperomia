import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native";
import Nav from "./Nav";

storiesOf("molecules/Header", module).add("Nav", () => (
  <View style={{ paddingTop: 60 }}>
    <Nav title="プランを作成" rightTitle="完了" onPress={() => {}} />
  </View>
));
