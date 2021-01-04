import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import theme from 'config/theme';
import Nav from './Nav';

storiesOf('molecules/Header', module).add('Nav', () => (
  <View style={styles.root}>
    <Nav title="プランを作成" rightTitle="完了" onPress={() => {}} />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: theme().space(5),
  },
});
