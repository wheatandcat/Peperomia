import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native";
import Page from "./Page";

storiesOf("pages", module).add("MyPage", () => (
  <View style={{ paddingTop: 30 }}>
    <Page email="****@gamil.com" onBackup={() => null} onRestore={() => null} />
  </View>
));
