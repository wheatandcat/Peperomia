import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { KINDS, KIND_PARK } from 'peperomia-util';
import theme from 'config/theme';
import DatePickerButton from './DatePicker';
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
  ))
  .add('DatePicker:未入力', () => (
    <View style={styles.root}>
      <DatePickerButton date={null} onInput={() => null} />
    </View>
  ))
  .add('DatePicker', () => (
    <View style={styles.root}>
      <DatePickerButton date="2020-01-01" onInput={() => null} />
    </View>
  ));

const styles = StyleSheet.create({
  root: {
    paddingTop: theme().space(6),
  },
  icon: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
