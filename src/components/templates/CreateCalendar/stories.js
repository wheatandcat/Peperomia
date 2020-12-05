import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK } from 'peperomia-util';
import { mockFn } from 'storyBookUtils';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import Page from './Page';

dayjs.extend(advancedFormat);

storiesOf('templates/CreateCalendar', module)
  .add('入力なし', () => (
    <Page
      date={dayjs().format('YYYY-MM-DDT00:00:00')}
      kind=""
      title=""
      place=""
      memo=""
      url=""
      moveMinutes={60}
      onDismiss={mockFn()}
      onIcons={mockFn()}
      onSave={mockFn()}
    />
  ))
  .add('入力有り', () => (
    <Page
      date={dayjs().format('YYYY-MM-DDT00:00:00')}
      title="葛西臨海公園"
      kind={KIND_PARK}
      memo="テスト1"
      place="テスト1"
      url="テスト1"
      moveMinutes={60}
      onDismiss={mockFn()}
      onIcons={mockFn()}
      onSave={mockFn()}
    />
  ))
  .add('ローディング中', () => (
    <Page
      date={dayjs().format('YYYY-MM-DDT00:00:00')}
      title="葛西臨海公園"
      kind={KIND_PARK}
      memo="テスト1"
      place="テスト1"
      url="テスト1"
      moveMinutes={60}
      onDismiss={mockFn()}
      onIcons={mockFn()}
      onSave={mockFn()}
      loading
    />
  ));
