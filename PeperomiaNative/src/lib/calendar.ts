import * as SQLite from 'expo-sqlite';
import { db } from '../lib/db/';
import { select } from './db/calendar';
import { findByUID } from './firestore/calendar';
import { getFireStore } from './firebase';

export async function getCalendars<T>(uid: string | null): Promise<T> {
  if (uid) {
    const firestore = getFireStore();
    return (await findByUID(firestore, uid)) as any;
  } else {
    return new Promise(function(resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        select(tx, (data, err) => {
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
