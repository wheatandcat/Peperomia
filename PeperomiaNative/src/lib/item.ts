import * as SQLite from 'expo-sqlite';
import { select, Item } from './db/item';
import { findByUID } from './firestore/item';
import { getFireStore } from './firebase';
import { db } from '../lib/db/';

export async function getItems<T>(uid: string | null): Promise<T> {
  if (uid) {
    const firestore = getFireStore();
    return (await findByUID(firestore, uid)) as any;
  } else {
    return new Promise(function(resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        select(tx, (data: Item[], err: SQLite.SQLError | null) => {
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
