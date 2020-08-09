import React from 'react';
import Bugsnag from '@bugsnag/expo';
import App from './src';

Bugsnag.start();

const AppContainer = () => <App />;

export default AppContainer;

console.disableYellowBox = true;
console.ignoredYellowBox = [
  'Remote debugger',
  'Possible Unhandled Promise Rejection (id: 0)',
  'Non-serializable values were found in the navigation state',
];
