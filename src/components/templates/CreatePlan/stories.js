import React from 'react';
import { storiesOf } from '@storybook/react-native';
import {
  KIND_PARK,
  KIND_LUNCH,
  KIND_HOME,
  KIND_AQUARIUM,
} from 'peperomia-util';
import Page from './Page';

const items = [
  {
    title: 'ランチ',
    kind: KIND_LUNCH,
  },
  {
    title: '公園',
    kind: KIND_PARK,
  },
  {
    title: '家',
    kind: KIND_HOME,
  },
  {
    title: '水族館',
    kind: KIND_AQUARIUM,
  },
];

storiesOf('templates/CreatePlan', module)
  .add('Default', () => (
    <Page
      onInput={() => {}}
      onSave={() => {}}
      title=""
      mode="new"
      image=""
      kind=""
      suggestList={items}
    />
  ))
  .add('Park', () => (
    <Page
      onInput={() => {}}
      onSave={() => {}}
      title="葛西臨海公園"
      mode="new"
      image=""
      kind=""
      suggestList={items}
    />
  ))
  .add('Train', () => (
    <Page
      onInput={() => {}}
      onSave={() => {}}
      title="新宿駅"
      mode="new"
      image=""
      kind=""
      suggestList={items}
    />
  ))
  .add('Ship', () => (
    <Page
      onInput={() => {}}
      onSave={() => {}}
      title="水上バス"
      mode="new"
      image=""
      kind=""
      suggestList={items}
    />
  ))
  .add('Fishing', () => (
    <Page
      onInput={() => {}}
      onSave={() => {}}
      title="釣り堀"
      mode="new"
      image=""
      kind=""
      suggestList={items}
    />
  ))
  .add('日付', () => (
    <Page
      onInput={() => {}}
      onSave={() => {}}
      title="釣り堀"
      mode="new"
      image=""
      kind=""
      suggestList={items}
      date="2019-10-01"
    />
  ));
