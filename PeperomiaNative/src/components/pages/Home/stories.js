import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import {
  KIND_PARK,
  KIND_AQUARIUM,
  KIND_ART_MUSEUM
} from "../../../lib/getKind";
import Page from "./Page";

const props = [
  {
    id: "1",
    title: "葛西臨海公園",
    kind: KIND_PARK,
    about: "水上バスで浅草から移動→そのまま海へ行って"
  },
  {
    id: "2",
    title: "横浜",
    kind: KIND_AQUARIUM,
    about: "水上バスで浅草から移動→そのまま海へ行って"
  },
  {
    id: "3",
    title: "横須賀",
    kind: KIND_ART_MUSEUM,
    about: "水上バスで浅草から移動→そのまま海へ行って"
  }
];

storiesOf("pages/Home", module)
  .add("Home", () => (
    <View style={{ paddingTop: 60 }}>
      <Page data={props} loading={false} />
    </View>
  ))
  .add("Guide", () => (
    <View style={{ paddingTop: 60 }}>
      <Page data={[]} guide loading={false} />
    </View>
  ))
  .add("not item", () => (
    <View style={{ paddingTop: 60 }}>
      <Page data={[]} loading={false} />
    </View>
  ));
