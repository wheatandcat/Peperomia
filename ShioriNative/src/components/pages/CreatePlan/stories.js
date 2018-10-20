import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import Page from "./Page";

storiesOf("pages", module).add("CreatePlan", () => (
  <View style={{ paddingTop: 60 }}>
    <Page />
  </View>
));
