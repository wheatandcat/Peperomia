import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useActionSheet } from '@expo/react-native-action-sheet';
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
  const { showActionSheetWithOptions } = useActionSheet();
  const kind = props.route?.params?.kind || '';
  const itemId = String(props.route?.params?.itemId) || '1';
  const priority = props.route?.params?.priority || 1;

  return (
    <Connected
      {...props}
      uid={uid}
      refreshData={refreshData}
      itemDetails={itemDetails}
      showActionSheetWithOptions={showActionSheetWithOptions}
      kind={kind}
      itemId={itemId}
      priority={priority}
    />
  );
};

export default AddScheduleDetail;
