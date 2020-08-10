import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useActionSheet } from '@expo/react-native-action-sheet';
import { RootStackParamList } from 'lib/navigation';
import { useItems } from 'containers/Items';
import { useAuth } from 'containers/Auth';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'EditPlan'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'EditPlan'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
  title: string;
  kind: string;
};

const EditPlan: React.FC<Props> = (props) => {
  const { refreshData, items, calendars } = useItems();
  const { uid } = useAuth();
  const { showActionSheetWithOptions } = useActionSheet();

  return (
    <Connected
      {...props}
      uid={uid}
      items={items}
      refreshData={refreshData}
      calendars={calendars}
      showActionSheetWithOptions={showActionSheetWithOptions}
    />
  );
};

export default EditPlan;
