import React, { memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { useCalendars } from 'containers/Calendars';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateCalendar'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'Calendar'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const Calendar: React.FC<Props> = memo((props) => {
  const { refetchCalendars } = useCalendars();

  const date = props.route.params.date;

  return (
    <Connected {...props} date={date} refetchCalendars={refetchCalendars} />
  );
});

export default Calendar;
