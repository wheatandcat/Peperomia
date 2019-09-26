import React from "react";
import { ActionSheetProvider } from "@expo/react-native-action-sheet";
import {
  getStorybookUI,
  configure,
  addDecorator
} from "@storybook/react-native";
import ThemeProvider from "../src/containers/Theme.tsx";
import { loadStories } from "./storyLoader";
import "./rn-addons";

export const provider = story => (
  <ActionSheetProvider>
    <ThemeProvider>{story()}</ThemeProvider>
  </ActionSheetProvider>
);

addDecorator(provider);

configure(() => {
  loadStories();
}, module);

// Refer to https://github.com/storybooks/storybook/tree/master/app/react-native#start-command-parameters
// To find allowed options for getStorybookUI
const StorybookUIRoot = getStorybookUI({});

export default StorybookUIRoot;
