import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import dayjs from 'dayjs';
import Page from './Page';

storiesOf('pages', module).add('Calendar', () => (
  <View style={styles.root}>
    <Page
      title="青山ランチ"
      date={dayjs().format('YYYY年MM月DD日')}
      kind="lunch"
    />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: 30,
  },
});
