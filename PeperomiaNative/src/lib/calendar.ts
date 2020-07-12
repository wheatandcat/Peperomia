import * as SQLite from 'expo-sqlite';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';
import 'dayjs/locale/ja';
import { db } from 'lib/db/';
import {
  CreateCalendarRequest,
  CreateCalendarResponse,
  UpdateCalendarlRequest,
  UpdateCalendarResponse,
} from 'domain/request';
import { Calendar, UpdateCalendar, SelectCalendar } from 'domain/calendar';
import { UID } from 'domain/user';
import { select, insert, update } from './db/calendar';
import { findByUID, Calendar as CalendarFirestore } from './firestore/calendar';
import { findInID as findItemInID } from './firestore/item';
import { getFireStore } from './firebase';
import { getIdToken, isLogin } from './auth';
import { post } from './fetch';

dayjs.extend(advancedFormat);

export async function getCalendars(uid: UID): Promise<SelectCalendar[]> {
  if (uid && isLogin(uid)) {
    const firestore = getFireStore();
    const calendars = (await findByUID(firestore, uid)) as CalendarFirestore[];
    if (calendars.length === 0) {
      return [] as any;
    }

    const ids = calendars.map((calendar) => String(calendar.itemId));
    const items = await findItemInID(firestore, uid, ids);

    const result = calendars.map((calendar) => {
      const item = items.find((v) => v.id === calendar.itemId);

      return {
        ...calendar,
        ...item,
      };
    });

    return result as any;
  } else {
    return new Promise(function (resolve, reject) {
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
  uid: UID,
  calendar: Calendar & { itemId: string | number }
): Promise<number | string | null | undefined> {
  if (uid && isLogin(uid)) {
    const idToken = (await getIdToken()) || '';

    const response = await post<CreateCalendarRequest, CreateCalendarResponse>(
      'CreateCalendar',
      {
        calendar: {
          ...calendar,
          date: dayjs(calendar.date).format('YYYY-MM-DDT00:00:00Z'),
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
    return new Promise(function (resolve, reject) {
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
  uid: UID,
  calendar: UpdateCalendar
): Promise<boolean> {
  if (uid && isLogin(uid)) {
    const idToken = (await getIdToken()) || '';
    const response = await post<UpdateCalendarlRequest, UpdateCalendarResponse>(
      'UpdateCalendar',
      {
        calendar: {
          ...calendar,
          date: dayjs(calendar.date).format('YYYY-MM-DDT00:00:00Z'),
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
    return new Promise(function (resolve, reject) {
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

// カレンダーの週間数を取得する
export const getWeekCount = (date: string) => {
  const startOfMonth = dayjs(date).startOf('month');
  const endOfMonth = dayjs(date).endOf('month');
  const firstDayOfWeek = startOfMonth.day();

  const days = endOfMonth.diff(startOfMonth, 'day') + 1;
  const weeks = Math.ceil((firstDayOfWeek + days) / 7);

  return weeks;
};
