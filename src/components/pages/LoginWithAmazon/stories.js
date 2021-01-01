import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import theme from 'config/theme';
import Page from './Page';

storiesOf('pages/LoginWithAmazon', module)
  .add('未ログイン', () => (
    <View style={styles.root}>
      <Page onAmazonLogin={() => null} />
    </View>
  ))
  .add('ログイン済み', () => (
    <View style={styles.root}>
      <Page linked onAmazonLogin={() => null} />
    </View>
  ));

const styles = StyleSheet.create({
  root: {
    paddingTop: theme().space(5),
  },
});
