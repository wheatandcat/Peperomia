import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import theme from 'config/theme';
import Page from './Page';

storiesOf('pages', module).add('Icons', () => (
  <View style={styles.root}>
    <Page kind="train" />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: theme().space(5),
  },
});
