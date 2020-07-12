import * as SQLite from 'expo-sqlite';
import * as Sentry from 'sentry-expo';
import { db } from './db';
import {
  select as selectItems,
  deleteAll as deleteItemAll,
  bulkInsert as bulkInsertItem,
  Item,
} from './db/item';
import {
  select as selectItemDetails,
  deleteAll as deleteItemDetailAll,
  bulkInsert as bulkInsertItemDetail,
  ItemDetail,
} from './db/itemDetail';
import {
  selectAll as selectCalendars,
  deleteAll as deleteCalendarAll,
  bulkInsert as bulkInsertCalendar,
  Calendar,
} from './db/calendar';
import { getFireStore } from './firebase';
import { findByUID as findItemByUID } from './firestore/item';
import { findByUID as findItemDetailByUID } from './firestore/itemDetail';
import { findByUID as findCalendarByUID } from './firestore/calendar';

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

export const restore = async (uid: string): Promise<any> => {
  const firestore = getFireStore();
  const items = await (await findItemByUID(firestore, uid)).map((item) => ({
    ...item,
    id: Number(item.id),
  }));
  const itemDetails = await findItemDetailByUID(firestore, uid);
  const calendars = await findCalendarByUID(firestore, uid);

  if (items.length === 0) {
    throw new Error('バックアップデータがありません。');
  }

  await db.transaction(async (tx: SQLite.SQLTransaction) => {
    await deleteAll(tx);
  });

  await db.transaction(async (tx: SQLite.SQLTransaction) => {
    await importAll(
      tx,
      items,
      itemDetails.map((itemDetail) => ({
        ...itemDetail,
        id: Number(itemDetail.id),
        itemId: Number(itemDetail.itemId),
      })),
      calendars.map((calendar) => ({
        ...calendar,
        id: Number(calendar.id),
        itemId: Number(calendar.itemId),
      }))
    );
  });
};

const truncateItems = (tx: SQLite.SQLTransaction): Promise<any> => {
  // アイテムを削除
  return new Promise(function (resolve, reject) {
    deleteItemAll(tx, (data: Item, err: any) => {
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

const truncateItemDetails = (tx: SQLite.SQLTransaction): Promise<any> => {
  // アイテム詳細を削除
  return new Promise(function (resolve, reject) {
    deleteItemDetailAll(tx, (data: ItemDetail[], err: any) => {
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

const truncateCalendars = (tx: SQLite.SQLTransaction): Promise<any> => {
  // アイテム詳細を削除
  return new Promise(function (resolve, reject) {
    deleteCalendarAll(tx, (data: Calendar, err: any) => {
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

const deleteAll = (tx: SQLite.SQLTransaction): Promise<any> => {
  return new Promise(function (
    resolve: () => void,
    reject: (error: Error) => void
  ) {
    try {
      Promise.all([
        truncateItems(tx),
        truncateItemDetails(tx),
        truncateCalendars(tx),
      ]).then(function () {
        resolve();
      });
    } catch (err) {
      Sentry.captureMessage(err);
      reject(err);
    }
  });
};

const importItems = (
  tx: SQLite.SQLTransaction,
  items: Item[]
): Promise<any> => {
  // アイテムを作成
  return new Promise(function (resolve, reject) {
    bulkInsertItem(tx, items, (data: Item[], err: any) => {
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

const importItemDetails = (
  tx: SQLite.SQLTransaction,
  itemDetail: ItemDetail[]
): Promise<any> => {
  // アイテム詳細を作成
  return new Promise(function (resolve, reject) {
    bulkInsertItemDetail(tx, itemDetail, (data: ItemDetail[], err: any) => {
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

const importCalendars = (
  tx: SQLite.SQLTransaction,
  calendars: Calendar[]
): Promise<any> => {
  // アイテム詳細を作成
  return new Promise(function (resolve, reject) {
    bulkInsertCalendar(tx, calendars, (data: Calendar[], err: any) => {
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

const importAll = (
  tx: SQLite.SQLTransaction,
  items: Item[],
  itemDetail: ItemDetail[],
  calendars: Calendar[]
): Promise<any> => {
  return new Promise(function (
    resolve: () => void,
    reject: (error: Error) => void
  ) {
    try {
      Promise.all([
        importItems(tx, items),
        importItemDetails(tx, itemDetail),
        importCalendars(tx, calendars),
      ]).then(function () {
        resolve();
      });
    } catch (err) {
      Sentry.captureMessage(err);
      reject(err);
    }
  });
};
