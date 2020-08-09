import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { useItems } from 'containers/Items';
import Switch from './Switch';

export type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'ScheduleDetail'
>;
export type ScreenRouteProp = RouteProp<RootStackParamList, 'ScheduleDetail'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const ScheduleDetail: React.FC<Props> = (props) => {
  const { refreshData } = useItems();

  return <Switch {...props} refreshData={refreshData} />;
};

export default ScheduleDetail;
