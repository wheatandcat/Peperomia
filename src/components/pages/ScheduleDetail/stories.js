import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { KIND_TRAIN } from 'peperomia-util';
import Page from './Page';

const props = {
  id: '1',
  kind: KIND_TRAIN,
  title: '新宿駅',
  memo: '■行く場所メモ\n・砂浜\n・観覧車\n・水族園',
  url: 'http://localhost:7007',
  place: '新宿駅西口',
  moveMinutes: 60,
};

storiesOf('pages/ScheduleDetail', module)
  .add('画面', () => <Page {...props} />)
  .add('ローディング', () => <Page {...props} loading />);
