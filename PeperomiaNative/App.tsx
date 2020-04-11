import 'react-native-match-media-polyfill';
import React from 'react';
import App from './src';
import StoryBookUI from './storybook';

const AppContainer = () => <App />;

export default AppContainer;

console.disableYellowBox = true;
console.ignoredYellowBox = [
  'Remote debugger',
  'Possible Unhandled Promise Rejection (id: 0)',
];
