import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK } from 'peperomia-util';
import { mockFn } from 'storyBookUtils';
import Page from './Page';

storiesOf('templates/CreateCalendar', module)
  .add('入力なし', () => (
    <Page
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
