import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import Page from "./Page";

storiesOf("templates", module)
  .add("CreateSchedule not created item", () => (
    <View style={{ paddingTop: 60 }}>
      <Page data={[]} />
    </View>
  ))
  .add("CreateSchedule", () => (
    <View style={{ paddingTop: 60 }}>
      <Page
        data={[
          {
            id: "1",
            title: "新宿駅",
            moveMinutes: 30,
            end: false
          },
          {
            id: "2",
            title: "葛西臨海公園",
            moveMinutes: 30,
            end: false
          },
          {
            id: "3",
            title: "西臨海公園 水上バス",
            moveMinutes: 30,
            end: false
          }
        ]}
      />
    </View>
  ));
