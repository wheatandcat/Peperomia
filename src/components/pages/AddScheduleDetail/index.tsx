import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { ItemDetail } from 'domain/itemDetail';
import { useItems } from 'containers/Items';
import { useAuth } from 'containers/Auth';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'AddScheduleDetail'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'AddScheduleDetail'>;

export type Props = ItemDetail & {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const AddScheduleDetail: React.FC<Props> = (props) => {
  const { refreshData, itemDetails } = useItems();
  const { uid } = useAuth();

  return (
    <Connected
      {...props}
      uid={uid}
      refreshData={refreshData}
      itemDetails={itemDetails}
    />
  );
};

export default AddScheduleDetail;
