import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import theme from 'config/theme';
import { mockFn } from 'storyBookUtils';
import Page from './Page';

storiesOf('pages', module).add('Icons', () => (
  <View style={styles.root}>
    <Page kind="train" onSelectIcon={mockFn('onSelectIcon')} />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: theme().space(0),
  },
});
