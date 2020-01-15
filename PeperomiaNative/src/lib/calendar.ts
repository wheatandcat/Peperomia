import * as SQLite from 'expo-sqlite';
import { db } from '../lib/db/';
import {
  CreateCalendarRequest,
  CreateCalendarResponse,
  UpdateCalendarlRequest,
  UpdateCalendarResponse,
} from '../domain/request';
import { Calendar, UpdateCalendar } from '../domain/calendar';
import { select, insert, update } from './db/calendar';
import { findByUID, Calendar as CalendarFirestore } from './firestore/calendar';
import { findInID as findItemInID } from './firestore/item';
import { getFireStore } from './firebase';
import { getIdToken } from './auth';
import { post } from './fetch';

export async function getCalendars<T>(uid: string | null): Promise<T> {
  if (uid) {
    const firestore = getFireStore();
    const calendars = (await findByUID(firestore, uid)) as CalendarFirestore[];
    if (calendars.length === 0) {
      return [] as any;
    }
    const ids = calendars.map(calendar => String(calendar.id));
    const items = await findItemInID(firestore, uid, ids);
    const result = calendars.map(calendar => {
      const item = items.find(v => v.id === calendar.id);

      return {
        ...calendar,
        ...item,
      };
    });

    return result as any;
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
      'CreateCalendar',
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

export async function updateCalendar(
  uid: string | null,
  calendar: UpdateCalendar
): Promise<boolean> {
  if (uid) {
    const idToken = (await getIdToken()) || '';
    const response = await post<UpdateCalendarlRequest, UpdateCalendarResponse>(
      'UpdateCalendar',
      {
        calendar: {
          ...calendar,
          id: String(calendar.id),
          itemId: String(calendar.itemId),
        },
      },
      idToken
    );
    if (response.error) {
      return false;
    }

    return true;
  } else {
    return new Promise(function(resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        const v = {
          ...calendar,
          id: Number(calendar.id),
          itemId: Number(calendar.itemId),
        };

        update(tx, v, (_, err) => {
          if (err) {
            reject(false);
            return;
          }

          resolve(true);
          return;
        });
      });
    });
  }
}
