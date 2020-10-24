import AsyncStorage from '@react-native-community/async-storage';
import firebase from 'lib/system/firebase';
import dayjs from 'dayjs';
import { UID } from 'domain/user';

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

class Auth {
  setSession = async (refresh = false) => {
    const user = firebase.auth().currentUser;
    if (!user) {
      return null;
    }

    const result = await user.getIdTokenResult(refresh);

    await AsyncStorage.setItem('id_token', result.token);
    await AsyncStorage.setItem('expiration', String(result.claims.exp));

    return result.token;
  };
  getIdToken = async () => {
    const idToken = await AsyncStorage.getItem('id_token');
    if (!idToken) {
      return null;
    }

    const expiration = await AsyncStorage.getItem('expiration');
    if (Number(expiration) > dayjs().unix()) {
      return idToken;
    }

    return this.setSession(true);
  };
}

export default Auth;
