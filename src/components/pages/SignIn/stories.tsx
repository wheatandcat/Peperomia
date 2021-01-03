import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import theme from 'config/theme';
import { mockFn } from 'storyBookUtils';
import Page from './Page';

storiesOf('pages', module).add('SignIn', () => (
  <View style={styles.root}>
    <Page
      loading={false}
      onGoogleLogin={mockFn('onGoogleLogin')}
      onAppleLogin={mockFn('onAppleLogin')}
    />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: theme().space(0),
  },
});
