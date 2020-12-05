import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK, KIND_AQUARIUM } from 'peperomia-util';
import Page from './Page';

const data = {
  calendar: {
    id: '1',
    date: '2020-01-01 00:00:00',
    item: {
      id: '1',
      title: '青山ランチ',
      kind: 'park',
      itemDetails: [
        {
          id: '1',
          title: '新宿駅',
          kind: KIND_PARK,
          memo: '',
          moveMinutes: 0,
          url: '',
          place: '',
          priority: 1,
        },
        {
          id: '2',
          title: '水族館',
          kind: KIND_AQUARIUM,
          memo: '',
          moveMinutes: 0,
          url: '',
          place: '',
          priority: 1,
        },
        {
          id: '3',
          title: '水族館',
          kind: KIND_AQUARIUM,
          memo: '',
          moveMinutes: 0,
          url: '',
          place: '',
          priority: 1,
        },
      ],
    },
  },
};

storiesOf('pages', module).add('Calendar', () => (
  <View style={styles.root}>
    <Page calendar={data.calendar} />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: 30,
  },
});
