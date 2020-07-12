import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK, KIND_LUNCH, KIND_TRAIN } from 'peperomia-util';
import Page from './Page';

storiesOf('templates/CreateSchedule', module)
  .add('データなし', () => (
    <Page title="青山ランチ" kind="" image="" data={[]} />
  ))
  .add('アイテム1つ', () => (
    <Page
      title="青山ランチ"
      kind=""
      image=""
      data={[
        {
          id: '1',
          title: '青山外苑駅',
          kind: KIND_TRAIN,
          moveMinutes: 30,
          end: false,
        },
      ]}
    />
  ))
  .add('アイテム3つ', () => (
    <Page
      title="青山ランチ"
      kind=""
      image=""
      data={[
        {
          id: '1',
          title: '青山外苑駅',
          kind: KIND_TRAIN,
          moveMinutes: 30,
          end: false,
        },
        {
          id: '2',
          title: '公園',
          kind: KIND_PARK,
          moveMinutes: 30,
          end: false,
        },
        {
          id: '3',
          title: 'ランチ',
          kind: KIND_LUNCH,
          moveMinutes: 30,
          end: false,
        },
      ]}
    />
  ));
