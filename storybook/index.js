import React from 'react';
import { ActionSheetProvider } from '@expo/react-native-action-sheet';
import {
  getStorybookUI,
  configure,
  addDecorator,
} from '@storybook/react-native';
import { AppearanceProvider } from 'react-native-appearance';
import ThemeProvider from '../src/containers/Theme.tsx';
import { loadStories } from './storyLoader';
import './rn-addons';

export const provider = (story) => (
  <AppearanceProvider>
    <ActionSheetProvider>
      <ThemeProvider>{story()}</ThemeProvider>
    </ActionSheetProvider>
  </AppearanceProvider>
);

addDecorator(provider);

configure(() => {
  loadStories();
}, module);

const StorybookUIRoot = getStorybookUI({
  port: 7007,
  onDeviceUI: true,
  host: 'localhost',
});

export default StorybookUIRoot;
