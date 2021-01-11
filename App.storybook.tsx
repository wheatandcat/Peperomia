import React from 'react';
import { AppRegistry } from 'react-native';
import App from './src';
import { STORY_BOOK_ENABLED } from 'react-native-dotenv';
import StoryBookUI from './storybook';
import { LogBox } from 'react-native';

AppRegistry.registerComponent('Peperomia', () => StoryBookUI);

export default StoryBookUI;

LogBox.ignoreLogs([
  'Remote debugger',
  'Possible Unhandled Promise Rejection (id: 0)',
]);
