import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { RootStackParamList } from 'lib/navigation';
import { SuggestItem } from 'lib/suggest';
import { useItems } from 'containers/Items';
import { useAuth } from 'containers/Auth';
import { ItemDetail } from 'domain/itemDetail';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateScheduleDetail'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'CreateScheduleDetail'>;

export type State = ItemDetail & {
  iconSelected: boolean;
  priority: number;
  suggestList: SuggestItem[];
};

export type Props = ItemDetail & {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const CreateScheduleDetail: React.FC<Props> = (props) => {
  const { refreshData, itemDetails } = useItems();
  const { uid } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();

  return (
    <Connected
      {...props}
      uid={uid}
      refreshData={refreshData}
      itemDetails={itemDetails}
      showActionSheetWithOptions={showActionSheetWithOptions}
    />
  );
};

export default CreateScheduleDetail;
