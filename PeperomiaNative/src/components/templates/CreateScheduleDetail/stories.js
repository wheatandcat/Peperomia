import React from "react";
import { storiesOf } from "@storybook/react-native";
import Page from "./Page";

storiesOf("templates/CreateScheduleDetail", module)
  .add("入力なし", () => <Page title="葛西臨海公園" memo="" time={60} />)
  .add("入力有り", () => (
    <Page
      title="葛西臨海公園"
      memo="テスト1"
      place="テスト1"
      url="テスト1"
      time={60}
    />
  ));
