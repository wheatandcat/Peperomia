import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK } from 'peperomia-util';
import Page from './Page';

const data = {
  date: '2020-01-01 00:00:00',
  itemDetail: {
    id: '1',
    title: '新宿駅',
    kind: KIND_PARK,
    memo: 'メモ',
    moveMinutes: 0,
    url: 'https://peperomia.app/',
    place: 'place',
    priority: 1,
  },
};

storiesOf('pages', module).add('itemDetail', () => (
  <Page itemDetail={data.itemDetail} date={data.date} />
));
