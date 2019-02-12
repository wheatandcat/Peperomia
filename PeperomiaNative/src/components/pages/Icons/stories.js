import React from "react";
import { storiesOf } from "@storybook/react-native";
import Page from "./Page";

storiesOf("pages", module).add("Icons", () => <Page kind="train" />);
