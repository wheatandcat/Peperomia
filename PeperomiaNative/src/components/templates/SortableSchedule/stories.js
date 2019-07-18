import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import { KIND_PARK } from "../../../lib/getKind";
import Page from "./Page";

storiesOf("templates", module).add("SortableSchedule", () => (
  <View style={{ paddingTop: 60 }}>
    <Page
      data={[
        {
          id: "1",
          title: "新宿駅",
          moveMinutes: 30,
          kind: KIND_PARK,
          end: false
        },
        {
          id: "2",
          title: "葛西臨海公園",
          moveMinutes: 30,
          kind: KIND_PARK,
          end: false
        },
        {
          id: "3",
          title: "西臨海公園 水上バス",
          moveMinutes: 30,
          kind: KIND_PARK,
          end: false
        }
      ]}
      onChange={() => null}
    />
  </View>
));
