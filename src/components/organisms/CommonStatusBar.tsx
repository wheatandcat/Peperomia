import React from 'react';
import theme, { darkMode } from 'config/theme';
import FocusAwareStatusBar from './FocusAwareStatusBar';

const CommonStatusBar = () => {
  return (
    <FocusAwareStatusBar
      backgroundColor={darkMode() ? theme().color.black : theme().color.main}
      barStyle={darkMode() ? 'light-content' : 'dark-content'}
    />
  );
};

export default CommonStatusBar;
