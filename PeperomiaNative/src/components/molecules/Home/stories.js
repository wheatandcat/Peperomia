import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK } from 'peperomia-util';
import Card from './Card';

storiesOf('molecules/Home', module).add('Card', () => (
  <View style={styles.styles}>
    <Card
      title="葛西臨海公園"
      about="水上バスで浅草から移動→そのまま海へ行って"
      kind={KIND_PARK}
      image=""
    />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: 60,
  },
});
