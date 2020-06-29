import AsyncStorage from '@react-native-community/async-storage';
import firebase from '../lib/system/firebase';
import { UID } from '../domain/user';

var isDebugMode: boolean = false;

export const setDebugMode = async (debugMode: boolean) => {
  if (debugMode) {
    await AsyncStorage.setItem('DEBUG_MODE', 'true');
  } else {
    await AsyncStorage.removeItem('DEBUG_MODE');
  }

  isDebugMode = debugMode;
};

export const getDebugMode = () => {
  return isDebugMode;
};

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
  if (isDebugMode) {
    // デバッグモード:ONの場合は強制的にSQLiteの値を見る
    return false;
  }

  if (uid) {
    return true;
  }

  return false;
};
