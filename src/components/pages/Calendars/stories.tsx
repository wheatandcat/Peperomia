import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK, KIND_ART_MUSEUM, KIND_COFFEE } from 'peperomia-util';
import { mockFn, StackNavigator } from 'storyBookUtils';
import Page from './Page';

const calendars = [
  {
    id: 'a',
    date: '2019-10-03',
    item: {
      id: 'a',
      kind: KIND_COFFEE,
    },
  },
  {
    id: 'b',
    date: '2019-10-14',
    item: {
      id: 'b',
      kind: KIND_PARK,
    },
  },
  {
    id: 'b',
    date: '2019-10-24',
    item: {
      id: 'b',
      kind: KIND_ART_MUSEUM,
    },
  },
];

const Screen = () => {
  return (
    <View style={styles.root}>
      <Page
        calendars={calendars}
        onCalendar={mockFn('onCalendar')}
        onCreate={mockFn('onCreate')}
        setDate={mockFn('setDate')}
        loading={false}
      />
    </View>
  );
};

storiesOf('pages', module).add('Calendars', () => (
  <StackNavigator screen={Screen} />
));

const styles = StyleSheet.create({
  root: {
    paddingTop: 0,
  },
});
