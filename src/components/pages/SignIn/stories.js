import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native";
import Page from "./Page";

storiesOf("pages", module).add("SignIn", () => (
  <View style={{ paddingTop: 30 }}>
    <Page />
  </View>
));
