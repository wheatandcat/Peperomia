import React from 'react';
import { storiesOf, StyleSheet } from '@storybook/react-native';
import { View } from 'react-native';
import { KIND_TRAIN } from 'peperomia-util';
import Card from './Card';
import ActionButton from './ActionButton';

const props = {
  id: '1',
  kind: KIND_TRAIN,
  title: '新宿駅',
  moveMinutes: 30,
  end: false,
};

storiesOf('molecules/Schedule', module)
  .add('Card', () => (
    <View style={styles.root}>
      <Card {...props} />
    </View>
  ))
  .add('ActionButton', () => (
    <View style={styles.root}>
      <ActionButton />
    </View>
  ));

const styles = StyleSheet.create({
  root: {
    paddingTop: 60,
  },
});
