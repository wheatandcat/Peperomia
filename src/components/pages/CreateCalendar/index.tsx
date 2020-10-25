import React, { memo } from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateCalendar'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'CreateCalendar'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const CreateCalendar: React.FC<Props> = memo((props) => {
  const date = props.route.params.date;

  return <Connected {...props} date={date} />;
});

export default CreateCalendar;
