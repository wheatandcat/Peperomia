import React from "react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import {
  getStorybookUI,
  configure,
  addDecorator
} from "@storybook/react-native";
import { loadStories } from "./storyLoader";

export const provider = story => (
  <ActionSheetProvider>{story()}</ActionSheetProvider>
);

addDecorator(provider);

configure(() => {
  loadStories();
}, module);

const StorybookUI = getStorybookUI({ port: 7007, host: "localhost" });
export default StorybookUI;
