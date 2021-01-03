import React from 'react';
import { View, StyleSheet } from 'react-native';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK, KIND_AQUARIUM } from 'peperomia-util';
import { mockFn, StackNavigator } from 'storyBookUtils';
import Page from './Page';

const data = {
  calendar: {
    id: '1',
    date: '2020-01-01 00:00:00',
    public: true,
    item: {
      id: '1',
      title: '青山ランチ',
      kind: 'park',
      itemDetails: [
        {
          id: '1',
          title: '新宿駅',
          kind: KIND_PARK,
          memo: '',
          url: '',
          place: '',
          priority: 1,
        },
        {
          id: '2',
          title: '水族館',
          kind: KIND_AQUARIUM,
          memo: '',
          url: '',
          place: '',
          priority: 1,
        },
        {
          id: '3',
          title: '水族館',
          kind: KIND_AQUARIUM,
          memo: '',
          url: '',
          place: '',
          priority: 1,
        },
      ],
    },
  },
};

const Screen = () => {
  return (
    <View style={styles.root}>
      <Page
        calendar={data.calendar}
        onDismiss={mockFn('onDismiss')}
        onUpdate={mockFn('onUpdate')}
        onDelete={mockFn('onDelete')}
        onShare={mockFn('onShare')}
        onAddItemDetail={mockFn('onAddItemDetail')}
        onItemDetail={mockFn('onItemDetail')}
        create={false}
      />
    </View>
  );
};

storiesOf('pages', module).add('Calendar', () => (
  <StackNavigator screen={Screen} />
));

const styles = StyleSheet.create({
  root: {
    paddingTop: 0,
  },
});
