import React from "react";
import { storiesOf } from "@storybook/react-native";
import Page from "./Page";

storiesOf("templates/CreatePlan", module)
  .add("Default", () => <Page onInput={() => { }} onSave={() => { }} title="" mode="new"/>)
  .add("Park", () => <Page onInput={() => { }} onSave={() => { }} title="葛西臨海公園" mode="new"/>)
  .add("Train", () => <Page onInput={() => { }} onSave={() => { }} title="新宿駅" mode="new"/>)
  .add("Ship", () => <Page onInput={() => { }} onSave={() => { }} title="水上バス" mode="new"/>)
  .add("Fishing", () => <Page onInput={() => { }} onSave={() => { }} title="釣り堀" mode="new"/>);
