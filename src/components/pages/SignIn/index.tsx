import React from 'react';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from 'lib/navigation';
import { useAuth } from 'containers/Auth';
import { useFetch } from 'containers/Fetch';
import { useItems } from 'containers/Items';
import Connected from './Connected';

type ScreenNavigationProp = StackNavigationProp<RootStackParamList, 'SignIn'>;
type ScreenRouteProp = RouteProp<RootStackParamList, 'SignIn'>;

export type Props = {
  navigation: ScreenNavigationProp;
  route: ScreenRouteProp;
};

const SignIn: React.FC<Props> = (props) => {
  const { onGoogleLogin, onAppleLogin, logout, uid } = useAuth();
  const { post } = useFetch();
  const { refreshData } = useItems();

  return (
    <Connected
      {...props}
      uid={uid}
      post={post}
      logout={logout}
      refreshData={refreshData}
      onGoogleLogin={onGoogleLogin}
      onAppleLogin={onAppleLogin}
    />
  );
};

export default SignIn;
