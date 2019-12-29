import React from "react";
import { storiesOf } from "@storybook/react-native";
import {
  KIND_PARK,
  KIND_LUNCH,
  KIND_HOME,
  KIND_AQUARIUM } from "../../../lib/getKind";
import Page from "./Page";

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

storiesOf('templates/CreateScheduleDetail', module)
  .add('入力なし', () => (
    <Page
      kind=""
      title="葛西臨海公園"
      place=""
      memo=""
      url=""
      moveMinutes={60}
      suggestList={[]}
    />
  ))
  .add('入力有り', () => (
    <Page
      title="葛西臨海公園"
      kind={KIND_PARK}
      memo="テスト1"
      place="テスト1"
      url="テスト1"
      suggestList={[]}
      moveMinutes={60}
    />
  ))
  .add('候補リスト', () => (
    <Page
      title="葛西臨海公園"
      kind={KIND_PARK}
      memo=""
      place=""
      url=""
      suggestList={items}
      moveMinutes={60}
    />
  ));
