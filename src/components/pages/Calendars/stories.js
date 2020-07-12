import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK, KIND_ART_MUSEUM, KIND_COFFEE } from 'peperomia-util';
import Page from './Page';

const calendars = [
  {
    kind: KIND_COFFEE,
    date: '2019-10-03',
  },
  {
    kind: KIND_PARK,
    date: '2019-10-14',
  },
  {
    kind: KIND_ART_MUSEUM,
    date: '2019-10-24',
  },
];

storiesOf('pages', module).add('Calendars', () => (
  <View style={styles.root}>
    <Page calendars={calendars} onCreate={() => null} onSchedule={() => null} />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: 60,
  },
});
