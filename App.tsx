import React from 'react';
import { LogBox } from 'react-native';
import App from './src';

const AppContainer = () => <App />;

export default AppContainer;

LogBox.ignoreLogs([
  'Remote debugger',
  'Possible Unhandled Promise Rejection (id: 0)',
  'Non-serializable values were found in the navigation state',
]);
