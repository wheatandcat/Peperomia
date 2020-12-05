import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import Page from './Page';

storiesOf('pages/Feedback', module)
  .add('Page', () => (
    <View style={styles.root}>
      <Page isOpen={false} />
    </View>
  ))
  .add('Overlay', () => (
    <View style={styles.root}>
      <Page isOpen />
    </View>
  ));

const styles = StyleSheet.create({
  root: {
    paddingTop: 60,
  },
});
