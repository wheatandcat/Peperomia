import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { useAuth } from 'containers/Auth';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'CreateSchedule'
>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'CreateSchedule'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const CreateSchedule: React.FC<Props> = (props) => {
  const { uid } = useAuth();
  const itemId = String(props.route?.params?.itemId) || '1';
  const refresh = props.route?.params?.refresh || '';

  return (
    <Connected
      uid={uid}
      itemId={itemId}
      refresh={refresh}
      navigation={props.navigation}
    />
  );
};

export default CreateSchedule;
