import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { KIND_PARK } from 'peperomia-util';
import Page from './Page';

const data = [
  {
    id: '1',
    title: '新宿駅',
    kind: KIND_PARK,
    moveMinutes: 30,
  },
  {
    id: '2',
    title: '葛西臨海公園',
    kind: KIND_PARK,
    moveMinutes: null,
  },
  {
    id: '3',
    title: '葛西臨海公園 水上バス',
    kind: KIND_PARK,
    moveMinutes: 120,
  },
  {
    id: '4',
    title: '浅草寺二天門前',
    kind: KIND_PARK,
    moveMinutes: null,
  },
];

storiesOf('pages/Schedule', module)
  .add('画面', () => (
    <View style={styles.root}>
      <Page data={data} />
    </View>
  ))
  .add('ローディング', () => (
    <View style={styles.root}>
      <Page data={data} loading />
    </View>
  ));

const styles = StyleSheet.create({
  root: {
    paddingTop: 60,
  },
});
