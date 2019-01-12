import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import Connected from "./Connected";
import Welcome from "./Welcome";
import Share from "./Share";

storiesOf("organisms/Guide", module)
  .add("Connected", () => (
    <View style={{ paddingTop: 60 }}>
      <Connected onFinish={() => {}} />
    </View>
  ))
  .add("Welcome", () => (
    <View style={{ paddingTop: 60 }}>
      <Welcome />
    </View>
  ))
  .add("Share", () => (
    <View style={{ paddingTop: 60 }}>
      <Share />
    </View>
  ));
