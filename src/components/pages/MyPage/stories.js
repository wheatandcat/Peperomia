import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import theme from 'config/theme';
import Page from './Page';

storiesOf('pages', module).add('MyPage', () => (
  <View style={styles.root}>
    <Page email="****@gamil.com" onBackup={() => null} onRestore={() => null} />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: theme().space(5),
  },
});
