import * as SQLite from 'expo-sqlite';
import { select, Calendar } from './db/calendar';
import { findByUID } from './firestore/calendar';
import { getFireStore } from './firebase';
import { db } from '../lib/db/';

export async function getCalendars<T>(uid: string | null): Promise<T> {
  if (uid) {
    const firestore = getFireStore();
    return (await findByUID(firestore, uid)) as any;
  } else {
    return new Promise(function(resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        select(tx, (data: Calendar[], err: SQLite.SQLError | null) => {
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
