import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { mockFn } from 'storyBookUtils';
import Page from './Page';

storiesOf('pages/Feedback', module)
  .add('Page', () => (
    <View style={styles.root}>
      <Page
        isOpen={false}
        loading={false}
        onFeedback={mockFn('onFeedback')}
        onClose={mockFn('onClose')}
      />
    </View>
  ))
  .add('Overlay', () => (
    <View style={styles.root}>
      <Page
        isOpen
        loading={false}
        onFeedback={mockFn('onFeedback')}
        onClose={mockFn('onClose')}
      />
    </View>
  ));

const styles = StyleSheet.create({
  root: {
    paddingTop: 0,
  },
});
