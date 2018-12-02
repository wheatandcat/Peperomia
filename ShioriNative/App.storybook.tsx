import React from "react";
import App from "./src";
import { STORY_BOOK_ENABLED } from "react-native-dotenv";
import StoryBookUI from "./storybook";

const AppContainer = () => <StoryBookUI />;

export default AppContainer;

console.disableYellowBox = true;
console.ignoredYellowBox = [
  "Remote debugger",
  "Possible Unhandled Promise Rejection (id: 0)"
];
