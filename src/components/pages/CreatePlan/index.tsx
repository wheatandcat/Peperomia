import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { useActionSheet } from '@expo/react-native-action-sheet';
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
  const { showActionSheetWithOptions } = useActionSheet();
  const date = props.route?.params?.date || '';
  const kind = props.route?.params?.kind || '';

  return (
    <Connected
      date={date}
      kind={kind}
      navigation={props.navigation}
      uid={uid}
      items={items}
      refreshData={refreshData}
      calendars={calendars}
      showActionSheetWithOptions={showActionSheetWithOptions}
    />
  );
};

export default CreatePlan;
