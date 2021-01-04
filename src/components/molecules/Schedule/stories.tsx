import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import theme from 'config/theme';
import Card from './Card';

const props = {
  id: '1',
  itemId: '1',
  kind: 'train',
  title: '新宿駅',
  end: false,
  memo: '',
  place: '',
  url: '',
  priority: 1,
};

storiesOf('molecules/Schedule', module).add('Card', () => (
  <View style={styles.root}>
    <Card {...props} />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: theme().space(5),
  },
});
