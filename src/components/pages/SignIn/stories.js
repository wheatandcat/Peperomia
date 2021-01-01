import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import theme from 'config/theme';
import Page from './Page';

storiesOf('pages', module).add('SignIn', () => (
  <View style={styles.root}>
    <Page />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: theme().space(5),
  },
});
