import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK } from 'peperomia-util';
import { mockFn, StackNavigator } from 'storyBookUtils';
import Page from './Page';

const data = {
  date: '2020-01-01 00:00:00',
  itemDetail: {
    id: '1',
    title: '新宿駅',
    kind: KIND_PARK,
    memo: 'メモ',
    url: 'https://peperomia.app/',
    place: 'place',
    priority: 1,
  },
};

const Screen = () => {
  return (
    <Page
      itemDetail={data.itemDetail}
      date={data.date}
      onDismiss={mockFn('onDismiss')}
      onUpdate={mockFn('onUpdate')}
      onDelete={mockFn('onDelete')}
      onUpdateMain={mockFn('onUpdateMain')}
    />
  );
};

storiesOf('pages', module).add('itemDetail', () => (
  <StackNavigator screen={Screen} />
));
