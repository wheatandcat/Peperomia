import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { KIND_PARK } from 'peperomia-util';
import Cards from './Cards';
import Loading from './Loading';

const props = [
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
    moveMinutes: null,
  },
];

storiesOf('organisms/Schedule/Cards', module)
  .add('カード一覧', () => (
    <View style={styles.root}>
      <Cards data={props} />
    </View>
  ))
  .add('ローディング', () => (
    <View style={styles.root}>
      <Loading />
    </View>
  ));

const styles = StyleSheet.create({
  root: {
    paddingTop: 60,
  },
});
