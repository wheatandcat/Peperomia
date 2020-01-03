import uuidv1 from 'uuid/v1';
import Constants from 'expo-constants';
import * as firebase from 'firebase';
import 'firebase/firestore';
import { isOffline } from '../firebase';

export const getUUID = (collection: string): string => {
  const uuid = Constants.installationId + uuidv1();
  return collection + uuid;
};

export const getOption = (): firebase.firestore.GetOptions | undefined => {
  if (isOffline()) {
    return {
      source: 'cache',
    };
  }

  return;
};
