import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import Page from "./Page";



storiesOf("pages/Feedback", module).add("Page", () => (
  <View style={{ paddingTop: 60 }}>
    <Page isOpen={false}/>
  </View>
)).add("Overlay", () => (
  <View style={{ paddingTop: 60 }}>
    <Page isOpen />
  </View>
));

