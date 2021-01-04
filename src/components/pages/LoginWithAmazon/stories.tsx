import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import theme from 'config/theme';
import { mockFn } from 'storyBookUtils';
import Page from './Page';

storiesOf('pages/LoginWithAmazon', module)
  .add('未ログイン', () => (
    <View style={styles.root}>
      <Page
        loading={false}
        linked={false}
        onAmazonLogin={mockFn('onAmazonLogin')}
      />
    </View>
  ))
  .add('ログイン済み', () => (
    <View style={styles.root}>
      <Page loading={false} linked onAmazonLogin={mockFn('onAmazonLogin')} />
    </View>
  ));

const styles = StyleSheet.create({
  root: {
    paddingTop: theme().space(5),
  },
});
