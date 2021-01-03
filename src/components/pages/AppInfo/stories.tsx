import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils';
import Page from './Page';

storiesOf('pages/AppInfo', module).add('Page', () => (
  <Page onDone={mockFn('onDone')} />
));
