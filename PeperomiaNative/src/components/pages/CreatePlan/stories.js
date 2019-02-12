import React from "react";
import { storiesOf } from "@storybook/react-native";
import Page from "./Page";

storiesOf("pages/CreatePlan", module)
  .add("Default", () => <Page onInput={() => { }} onSave={() => { }} title="" />)
  .add("Park", () => <Page onInput={() => { }} onSave={() => { }} title="葛西臨海公園" />)
  .add("Train", () => <Page onInput={() => { }} onSave={() => { }} title="新宿駅" />)
  .add("Ship", () => <Page onInput={() => { }} onSave={() => { }} title="水上バス" />)
  .add("Fishing", () => <Page onInput={() => { }} onSave={() => { }} title="釣り堀" />);
