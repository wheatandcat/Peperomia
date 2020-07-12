import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { View, StyleSheet } from 'react-native';
import { KIND_PARK } from 'peperomia-util';
import Page from './Page';

storiesOf('templates', module).add('SortableSchedule', () => (
  <View style={styles.root}>
    <Page
      data={[
        {
          id: '1',
          title: '新宿駅',
          moveMinutes: 30,
          kind: KIND_PARK,
          end: false,
        },
        {
          id: '2',
          title: '葛西臨海公園',
          moveMinutes: 30,
          kind: KIND_PARK,
          end: false,
        },
        {
          id: '3',
          title: '西臨海公園 水上バス',
          moveMinutes: 30,
          kind: KIND_PARK,
          end: false,
        },
      ]}
      onChange={() => null}
    />
  </View>
));

const styles = StyleSheet.create({
  root: {
    paddingTop: 60,
  },
});
