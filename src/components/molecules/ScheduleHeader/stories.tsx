import React from 'react';
import { storiesOf } from '@storybook/react-native';
import { KIND_PARK } from 'peperomia-util';
import Header from './Header';

storiesOf('molecules/ScheduleHeader', module).add('Header', () => (
  <Header kind={KIND_PARK} />
));
