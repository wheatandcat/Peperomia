import React from "react";
import { View } from "react-native";
import { storiesOf } from "@storybook/react-native";
import { KIND_PARK } from "../../../lib/getKind";
import Image from "./Image";

storiesOf("organisms/Calendars", module).add("Image", () => (
  <View style={{ padding: 60 }}>
    <Image kind={KIND_PARK} day="1" />
  </View>
));
