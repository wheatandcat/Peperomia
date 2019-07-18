import React from "react";
import { storiesOf } from "@storybook/react-native";
import {
  KIND_PARK,
  KIND_LUNCH,
  KIND_HOME,
  KIND_AQUARIUM
} from "../../../lib/getKind";
import List from "./List";

const items = [
  {
    title: "ランチ",
    kind: KIND_LUNCH
  },
  {
    title: "公園",
    kind: KIND_PARK
  },
  {
    title: "家",
    kind: KIND_HOME
  },
  {
    title: "水族館",
    kind: KIND_AQUARIUM
  }
];

storiesOf("organisms/Suggest", module).add("List", () => (
  <List items={items} />
));
