import React from 'react';
import App from './src';

const AppContainer = () => <App />;

export default AppContainer;

console.disableYellowBox = true;
console.ignoredYellowBox = [
  'Remote debugger',
  'Possible Unhandled Promise Rejection (id: 0)',
  'Non-serializable values were found in the navigation state',
];
