import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK, KIND_AQUARIUM } from 'peperomia-util';
import dayjs from 'dayjs';
import Page from './Page';

const data = [
  {
    id: '1',
    title: '新宿駅',
    kind: KIND_PARK,
  },
  {
    id: '2',
    title: '水族館',
    kind: KIND_AQUARIUM,
  },
  {
    id: '3',
    title: '水族館',
    kind: KIND_AQUARIUM,
  },
];

storiesOf('pages', module).add('Calendar', () => (
  <View style={styles.root}>
    <Page
      title="青山ランチ"
      date={dayjs().format('YYYY年MM月DD日')}
      kind="lunch"
      data={data}
    />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: 30,
  },
});
