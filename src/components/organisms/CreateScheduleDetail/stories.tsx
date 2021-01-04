import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { mockFn } from 'storyBookUtils';
import TimeDialog from './TimeDialog';
import Memo from './Memo';

storiesOf('organisms/CreateScheduleDetail', module)
  .add('TimeDialog', () => (
    <TimeDialog
      open
      onChange={mockFn('onChange')}
      onSetManualTime={mockFn('onSetManualTime')}
      onCloseManualTime={mockFn('onCloseManualTime')}
    />
  ))
  .add('Memo', () => (
    <Memo
      place="place"
      url="url"
      memo="memo"
      onChangeInputText={mockFn('onChangeInputText')}
    />
  ));
