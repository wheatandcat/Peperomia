import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import {
  KIND_PARK,
} from "../../../lib/getKind";
import Cards from "./Cards";

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
    kind: KIND_PARK,
    about: "水上バスで浅草から移動→そのまま海へ行って"
  },
  {
    id: "3",
    title: "横須賀",
    kind: KIND_PARK,
    about: "水上バスで浅草から移動→そのまま海へ行って"
  }
  
];

storiesOf("organisms/Home", module).add("Cards", () => (
  <View style={{ paddingTop: 60 }}>
    <Cards data={props} loading={false} />
  </View>
));
