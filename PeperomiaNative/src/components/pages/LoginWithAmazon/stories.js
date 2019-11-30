import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native";
import Page from "./Page";

storiesOf("pages/LoginWithAmazon", module)
  .add("未ログイン", () => (
    <View style={{ paddingTop: 30 }}>
      <Page onAmazonLogin={() => null} />
    </View>
  ))
  .add("ログイン済み", () => (
    <View style={{ paddingTop: 30 }}>
      <Page linked onAmazonLogin={() => null} />
    </View>
  ));
