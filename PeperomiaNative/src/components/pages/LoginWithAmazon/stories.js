import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native";
import Page from "./Page";

storiesOf("pages", module).add("LoginWithAmazon", () => (
  <View style={{ paddingTop: 30 }}>
    <Page onAmazonLogin={() => null} />
  </View>
));
