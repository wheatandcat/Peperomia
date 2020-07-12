import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native";
import Page from "./Page";

storiesOf("pages", module).add("Icons", () => (
  <View style={{ paddingTop: 50 }}>
    <Page kind="train" />
  </View>
));
