import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import theme from 'config/theme';
import { mockFn } from 'storyBookUtils';
import Page from './Page';

storiesOf('pages', module).add('MyPage', () => (
  <View style={styles.root}>
    <Page
      loading={false}
      email="****@gamil.com"
      LoadingText=""
      onBackup={mockFn('onBackup')}
      onNotificationSetting={mockFn('onRonNotificationSettingestore')}
    />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: theme().space(0),
  },
});
