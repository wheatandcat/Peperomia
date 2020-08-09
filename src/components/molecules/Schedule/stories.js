import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import Card from './Card';
import ActionButton from './ActionButton';

const props = {
  id: '1',
  kind: 'train',
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
