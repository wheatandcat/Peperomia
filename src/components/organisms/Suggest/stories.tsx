import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils';
import List from './List';

const items = ['ランチ', '公園', '家', '水族館'];

storiesOf('organisms/Suggest', module).add('List', () => (
  <List suggestList={items} onPress={mockFn('onPress')} title="" />
));
