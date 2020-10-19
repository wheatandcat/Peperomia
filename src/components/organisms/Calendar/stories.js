import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK, KIND_AQUARIUM } from 'peperomia-util';
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
        <Add onPress={() => null} />
      </View>
    </View>
  ));

const styles = StyleSheet.create({
  root: {
    width: '100%',
    flexDirection: 'row',
  },
  card1: {
    paddingTop: 30,
    width: '50%',
    padding: 15,
    paddingRight: 10,
  },
  card2: {
    paddingTop: 30,
    width: '50%',
    padding: 15,
    paddingLeft: 10,
  },
});
