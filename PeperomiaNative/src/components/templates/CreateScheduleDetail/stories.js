import React from "react";
import { storiesOf } from "@storybook/react-native";
import Page from "./Page";

storiesOf("templates", module).add("CreateScheduleDetail", () => (
  <Page title="葛西臨海公園" memo="" time={60} />
))
