import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { useItems } from 'containers/Items';
import { useAuth } from 'containers/Auth';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreatePlan'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'CreatePlan'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const CreatePlan: React.FC<Props> = (props) => {
  const { items, refreshData, calendars } = useItems();
  const { uid } = useAuth();

  return (
    <Connected
      {...props}
      uid={uid}
      items={items}
      refreshData={refreshData}
      calendars={calendars}
    />
  );
};

export default CreatePlan;
