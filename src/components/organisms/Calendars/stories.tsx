import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK } from 'peperomia-util';
import theme from 'config/theme';
import Image from './Image';

storiesOf('organisms/Calendars', module).add('Image', () => (
  <View style={styles.root}>
    <Image kind={KIND_PARK} day="1" currentDate="2020-01-01" />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: theme().space(5),
  },
});
