import * as SQLite from 'expo-sqlite';
import * as Sentry from 'sentry-expo';
import { db } from './db';
import { select as selectItems, Item } from './db/item';
import { select as selectItemDetails, ItemDetail } from './db/itemDetail';
import { selectAll as selectCalendars, Calendar } from './db/calendar';

type Backup = {
  items: Item[];
  itemDetails: ItemDetail[];
  calendars: Calendar[];
};

export const backup = (): Promise<Backup> => {
  return new Promise(function (
    resolve: (result: Backup) => void,
    reject: (error: Error) => void
  ) {
    try {
      db.transaction(async (tx: SQLite.SQLTransaction) => {
        Promise.all([
          getItemAll(tx),
          getItemDetailAll(tx),
          getCalendarAll(tx),
        ]).then(function (values) {
          resolve({
            items: values[0],
            itemDetails: values[1] as ItemDetail[],
            calendars: values[2],
          });
        });
      });
    } catch (err) {
      Sentry.captureMessage(err);
      reject(err);
    }
  });
};

const getItemAll = (tx: SQLite.SQLTransaction): Promise<Item[]> => {
  // アイテムを取得
  return new Promise(function (resolve, reject) {
    selectItems(tx, (data: Item[], error: SQLite.SQLError | null) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(data);
      return;
    });
  });
};

const getItemDetailAll = (tx: SQLite.SQLTransaction): Promise<ItemDetail[]> => {
  // アイテム詳細を取得
  return new Promise(function (resolve, reject) {
    selectItemDetails(tx, (data: ItemDetail[], err: any) => {
      if (err) {
        Sentry.captureMessage(err);
        reject(err);
        return;
      }

      resolve(data);
      return;
    });
  });
};

const getCalendarAll = (tx: SQLite.SQLTransaction): Promise<Calendar[]> => {
  // アイテム詳細を取得
  return new Promise(function (resolve, reject) {
    selectCalendars(tx, (data: Calendar[], err: any) => {
      if (err) {
        Sentry.captureMessage(err);
        reject(err);
        return;
      }

      resolve(data);
      return;
    });
  });
};
