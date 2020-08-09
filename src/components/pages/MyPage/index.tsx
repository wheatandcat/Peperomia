import React from 'react';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { useFetch } from 'containers/Fetch';
import { useAuth } from 'containers/Auth';
import { useItems } from 'containers/Items';
import { useNotification } from 'containers/Notification';
import Connected from './Connected';

dayjs.extend(advancedFormat);

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'MyPage'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'MyPage'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const MyPage: React.FC<Props> = (props) => {
  const { email, uid } = useAuth();
  const { post } = useFetch();
  const { refreshData } = useItems();
  const { onPermissionRequest } = useNotification();

  return (
    <Connected
      {...props}
      post={post}
      email={email}
      uid={uid}
      refreshData={refreshData}
      onPermissionRequest={onPermissionRequest}
    />
  );
};

export default MyPage;
