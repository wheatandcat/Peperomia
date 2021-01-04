import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import theme from 'config/theme';
import { mockFn } from 'storyBookUtils';
import BottomRight from './BottomRight';
import Mask from './Mask';

storiesOf('atoms/Hint', module)
  .add('BottomRight', () => (
    <View style={styles.root}>
      <BottomRight />
    </View>
  ))
  .add('BottomRight and Mask', () => (
    <Mask onPress={mockFn('onPress')}>
      <BottomRight />
    </Mask>
  ));

const styles = StyleSheet.create({
  root: {
    paddingTop: theme().space(6),
  },
});
