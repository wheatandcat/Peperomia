import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK, KIND_AQUARIUM } from 'peperomia-util';
import theme from 'config/theme';
import Card from './Card';
import Add from './Add';

storiesOf('organisms/Calendar', module)
  .add('Card', () => (
    <View style={styles.root}>
      <View style={styles.card1}>
        <Card title="公園" kind={KIND_PARK} />
      </View>
      <View style={styles.card2}>
        <Card title="水族館" kind={KIND_AQUARIUM} />
      </View>
    </View>
  ))
  .add('Add', () => (
    <View style={styles.root}>
      <View style={styles.card1}>
        <Add />
      </View>
    </View>
  ));

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
  },
  card1: {
    paddingTop: theme().space(4),
    width: '50%',
    padding: theme().space(3),
    paddingRight: theme().space(2),
  },
  card2: {
    paddingTop: theme().space(4),
    width: '50%',
    padding: theme().space(3),
    paddingLeft: theme().space(2),
  },
});
