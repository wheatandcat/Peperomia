import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native";
import { KINDS, KIND_PARK } from "../../lib/getKind";
import { Text } from "./";
import IconImage from "./IconImage";

storiesOf("atoms", module)
  .add("Text", () => (
    <View style={{ paddingTop: 60 }}>
      <Text>あいうえお</Text>
    </View>
  ))
  .add("アイコン", () => (
    <View
      style={{
        height: "100%",
        width: "100%",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <IconImage src={KINDS[KIND_PARK].src} name="" size={60} opacity={1} />
    </View>
  ));
