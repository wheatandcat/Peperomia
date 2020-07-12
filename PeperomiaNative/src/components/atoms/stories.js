import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { KINDS, KIND_PARK } from 'peperomia-util';
import { Text, IconImage } from './';

storiesOf('atoms', module)
  .add('Text', () => (
    <View style={styles.root}>
      <Text>あいうえお</Text>
    </View>
  ))
  .add('アイコン', () => (
    <View style={styles.icon}>
      <IconImage src={KINDS[KIND_PARK].src} name="" size={60} opacity={1} />
    </View>
  ));

const styles = StyleSheet.create({
  root: {
    paddingTop: 60,
  },
  icon: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
