import * as firebase from 'firebase';
import { AsyncStorage } from 'react-native';
import { UID } from '../domain/user';

const setSession = async (refresh = false) => {
  const user = firebase.auth().currentUser;
  if (!user) {
    return null;
  }

  const idToken = await user.getIdToken(refresh);
  await AsyncStorage.setItem('id_token', idToken);
  await AsyncStorage.setItem(
    'expiration',
    String(new Date().getTime() + 60 * 60)
  );

  return idToken;
};

export const getIdToken = async () => {
  const idToken = await AsyncStorage.getItem('id_token');
  if (!idToken) {
    return null;
  }

  const expiration = await AsyncStorage.getItem('expiration');
  if (Number(expiration) > new Date().getTime()) {
    return idToken;
  }

  return setSession(true);
};

export const isLogin = (uid: UID): boolean => {
  if (uid) {
    return true;
  }

  return false;
};
