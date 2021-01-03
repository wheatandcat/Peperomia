import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK } from 'peperomia-util';
import { mockFn, StackNavigator } from 'storyBookUtils';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import Page from './Page';

dayjs.extend(advancedFormat);

storiesOf('templates/CreateCalendar', module)
  .add('入力なし', () => (
    <StackNavigator
      screen={() => (
        <Page
          loading={false}
          date={dayjs().format('YYYY-MM-DDT00:00:00')}
          itemDetail={{
            id: '',
            kind: '',
            title: '',
            place: '',
            memo: '',
            url: '',
            priority: 1,
          }}
          selectedKind=""
          onDismiss={mockFn('onDismiss')}
          onIcons={mockFn('onIcons')}
          onSave={mockFn('onSave')}
        />
      )}
    />
  ))
  .add('入力有り', () => (
    <StackNavigator
      screen={() => (
        <Page
          loading={false}
          date={dayjs().format('YYYY-MM-DDT00:00:00')}
          itemDetail={{
            id: 'qqq',
            kind: KIND_PARK,
            title: '葛西臨海公園',
            place: 'テスト1',
            memo: 'テスト1',
            url: 'テスト1',
            priority: 1,
          }}
          selectedKind=""
          onDismiss={mockFn('onDismiss')}
          onIcons={mockFn('onIcons')}
          onSave={mockFn('onSave')}
        />
      )}
    />
  ));
