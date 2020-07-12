import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { KIND_PARK, KIND_AQUARIUM, KIND_ART_MUSEUM } from 'peperomia-util';
import Page from './Page';

const props = [
  {
    id: '1',
    title: '葛西臨海公園',
    kind: KIND_PARK,
    about: '水上バスで浅草から移動→そのまま海へ行って',
  },
  {
    id: '2',
    title: '横浜',
    kind: KIND_AQUARIUM,
    about: '水上バスで浅草から移動→そのまま海へ行って',
  },
  {
    id: '3',
    title: '横須賀',
    kind: KIND_ART_MUSEUM,
    about: '水上バスで浅草から移動→そのまま海へ行って',
  },
];

storiesOf('pages/Home', module)
  .add('Home', () => (
    <View style={styles.root}>
      <Page data={props} loading={false} />
    </View>
  ))
  .add('Guide', () => (
    <View style={styles.root}>
      <Page data={[]} guide loading={false} />
    </View>
  ))
  .add('not item', () => (
    <View style={styles.root}>
      <Page data={[]} loading={false} />
    </View>
  ));

const styles = StyleSheet.create({
  root: {
    paddingTop: 60,
  },
});
