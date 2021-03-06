import React, { memo, useCallback } from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { ContextProps as CalendarsContextProps } from 'containers/Calendars';
import { Props as IndexProps } from './';
import Page from './Page';

dayjs.extend(advancedFormat);

type Props = IndexProps &
  Pick<CalendarsContextProps, 'calendars' | 'setDate'> & {
    loading: boolean;
  };

export type ConnectedType = {
  onCreate: (date: string) => void;
  onCalendar: (date: string) => void;
};

const Connected: React.FC<Props> = memo((props) => {
  const onCreate = useCallback(
    (date: string) => {
      props.navigation.navigate('CreateCalendar', {
        date: dayjs(date).format('YYYY-MM-DDT00:00:00'),
      });
    },
    [props.navigation]
  );

  const onCalendar = useCallback(
    (date: string) => {
      props.navigation.navigate('Calendar', {
        date: dayjs(date).format('YYYY-MM-DDT00:00:00'),
      });
    },
    [props.navigation]
  );

  return (
    <Page
      calendars={props.calendars}
      setDate={props.setDate}
      loading={props.loading}
      onCreate={onCreate}
      onCalendar={onCalendar}
    />
  );
});

export default Connected;
