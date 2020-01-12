import * as SQLite from 'expo-sqlite';
import { selectByItemId, select1st } from './db/itemDetail';
import { findByItemID, findByID } from './firestore/itemDetail';
import { getFireStore } from './firebase';
import { db } from '../lib/db/';

export async function getItemDetails<T>(
  uid: string | null,
  itemID: string
): Promise<T> {
  if (uid) {
    const firestore = getFireStore();
    return (await findByItemID(firestore, uid, itemID)) as any;
  } else {
    return new Promise(function(resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        selectByItemId(tx, itemID, (data, err) => {
          if (err) {
            reject([]);
            return;
          }

          resolve(data as any);
          return;
        });
      });
    });
  }
}

export async function getItemDetailByID<T>(
  uid: string | null,
  id: string
): Promise<T> {
  if (uid) {
    const firestore = getFireStore();
    return (await findByID(firestore, uid, id)) as any;
  } else {
    return new Promise(function(resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        select1st(tx, id, (data, err) => {
          if (err) {
            reject({});
            return;
          }

          resolve(data as any);
          return;
        });
      });
    });
  }
}
