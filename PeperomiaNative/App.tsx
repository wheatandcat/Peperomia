import React from "react";
import { AppRegistry } from "react-native";
import App from "./src";
import { STORY_BOOK_ENABLED } from "react-native-dotenv";
import StoryBookUI from "./storybook";

AppRegistry.registerComponent("Peperomia", () => StoryBookUI);

export default StoryBookUI;

console.disableYellowBox = true;
console.ignoredYellowBox = [
  "Remote debugger",
  "Possible Unhandled Promise Rejection (id: 0)"
];
