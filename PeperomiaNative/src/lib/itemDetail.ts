import * as SQLite from 'expo-sqlite';
import { selectByItemId, ItemDetail } from './db/itemDetail';
import { findByItemID } from './firestore/itemDetail';
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
        selectByItemId(
          tx,
          itemID,
          (data: ItemDetail[], err: SQLite.SQLError | null) => {
            if (err) {
              reject([]);
              return;
            }

            resolve(data as any);
            return;
          }
        );
      });
    });
  }
}
