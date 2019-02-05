import React from "react";
import { storiesOf } from "@storybook/react-native";
import Page from "./Page";

storiesOf("pages/CreatePlan", module)
  .add("Default", () => <Page onInput={() => {}} title="" />)
  .add("Park", () => <Page onInput={() => {}} title="葛西臨海公園" />)
  .add("Train", () => <Page onInput={() => {}} title="新宿駅" />)
  .add("Ship", () => <Page onInput={() => {}} title="水上バス" />)
  .add("Fishing", () => <Page onInput={() => {}} title="釣り堀" />);
