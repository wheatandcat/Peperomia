import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils';
import Page from './Page';

storiesOf('pages', module).add('Setting', () => (
  <Page
    login={false}
    loading={false}
    restoreLoading={false}
    debugMode={false}
    uid="aaaa"
    onResetSQL={mockFn('')}
    onDeleteSQL={mockFn('')}
    onShowSQL={mockFn('')}
    onData={mockFn('')}
    onDeleteUser={mockFn('')}
    onTos={mockFn('')}
    onPolicy={mockFn('')}
    onSignIn={mockFn('')}
    onLogout={mockFn('')}
    onFeedback={mockFn('')}
    onMyPage={mockFn('')}
    onNotificationSetting={mockFn('')}
    onMigrationV100={mockFn('')}
    onLoginWithAmazon={mockFn('')}
    onChangeDebugMode={mockFn('')}
  />
));
