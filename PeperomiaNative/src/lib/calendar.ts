import * as SQLite from 'expo-sqlite';
import { db } from '../lib/db/';
import {
  CreateCalendarRequest,
  CreateCalendarResponse,
} from '../domain/request';
import { Calendar } from '../domain/calendar';
import { select, insert } from './db/calendar';
import { findByUID } from './firestore/calendar';
import { getFireStore } from './firebase';
import { getIdToken } from './auth';
import { post } from './fetch';

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

export async function createCalendar(
  uid: string | null,
  calendar: Calendar & { itemId: string | number }
): Promise<number | string | null | undefined> {
  if (uid) {
    const idToken = (await getIdToken()) || '';
    const response = await post<CreateCalendarRequest, CreateCalendarResponse>(
      '/CreateCalendar',
      {
        calendar: {
          ...calendar,
          itemId: String(calendar.itemId),
        },
      },
      idToken
    );
    if (response.error) {
      return null;
    }

    return response.body.id;
  } else {
    return new Promise(function(resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        const v = { ...calendar, itemId: Number(calendar.itemId) };

        insert(tx, v, (insertId, err) => {
          if (err) {
            reject(null);
            return;
          }

          resolve(insertId as any);
          return;
        });
      });
    });
  }
}
