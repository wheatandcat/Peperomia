import firebase from './system/firebase';
import { firebaseConfig } from '../config/firebase';

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();
let offline: boolean = false;

export const settingNetwork = async (online: boolean) => {
  if (online) {
    await db.enableNetwork();
    offline = true;
  } else {
    /*
    db.settings({
      cacheSizeBytes: firebase.firestore.CACHE_SIZE_UNLIMITED,
    });
    db.enablePersistence({ experimentalTabSynchronization: true }).catch(
      err => {
        console.log(err);
      }
    );
    */

    await db.disableNetwork();
    offline = false;
  }
};

export const getFireStore = () => {
  return db;
};

export const isOffline = () => {
  return offline;
};
