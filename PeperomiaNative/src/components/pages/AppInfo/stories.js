import React from "react";
import { storiesOf } from "@storybook/react-native";
import { View } from "react-native-ui-lib";
import Page from "./Page";

storiesOf("pages/AppInfo", module)
  .add("Page", () => (
    <Page/>
  ))

