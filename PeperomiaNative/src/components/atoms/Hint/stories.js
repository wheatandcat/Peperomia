import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native";
import BottomRight from "./BottomRight";
import Mask from "./Mask";

storiesOf("atoms/Hint", module)
  .add("BottomRight", () => (
    <View style={{ paddingTop: 60 }}>
      <BottomRight />
    </View>
  ))
  .add("BottomRight and Mask", () => (
    <Mask>
      <BottomRight />
    </Mask>
  ));
