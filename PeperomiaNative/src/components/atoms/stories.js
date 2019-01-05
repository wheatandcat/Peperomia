import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import { Text } from "./";

storiesOf("atoms", module).add("Text", () => (
  <View style={{ paddingTop: 60 }}>
    <Text>あいうえお</Text>
  </View>
));
