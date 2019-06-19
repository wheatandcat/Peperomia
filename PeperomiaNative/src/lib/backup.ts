import { SQLite } from "expo";
import { db } from "./db";
import {
  select as selectItems,
  deleteAll as deleteItemAll,
  bulkInsert as bulkInsertItem,
  Item
} from "./db/item";
import {
  select as selectItemDetails,
  deleteAll as deleteItemDetailAll,
  bulkInsert as bulkInsertItemDetail,
  ItemDetail
} from "./db/itemDetail";
import { getFireStore } from "./firebase";
import { findByUID as findItemByUID } from "./firestore/item";
import { findByUID as findItemDetailByUID } from "./firestore/itemDetail";
import { Sentry } from "react-native-sentry";

interface Backup {
  items: Item[];
  itemDetails: ItemDetail[];
}

export const backup = (): Promise<Backup> => {
  return new Promise(function(
    resolve: (result: Backup) => void,
    reject: (error: Error) => void
  ) {
    try {
      db.transaction(async (tx: SQLite.Transaction) => {
        Promise.all([getItemAll(tx), getItemDetailAll(tx)]).then(function(
          values
        ) {
          resolve({
            items: values[0],
            itemDetails: values[1]
          });
        });
      });
    } catch (err) {
      Sentry.captureMessage(err);
      reject(err);
    }
  });
};

const getItemAll = (tx: SQLite.Transaction): Promise<Item[]> => {
  // アイテムを取得
  return new Promise(function(resolve, reject) {
    selectItems(tx, (data: any, error: any) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(data);
      return;
    });
  });
};

const getItemDetailAll = (tx: SQLite.Transaction): Promise<ItemDetail[]> => {
  // アイテム詳細を取得
  return new Promise(function(resolve, reject) {
    selectItemDetails(tx, (data: any, err: any) => {
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
  const items = await findItemByUID(firestore, uid);
  const itemDetails = await findItemDetailByUID(firestore, uid);

  if (items.length === 0) {
    throw new Error("バックアップデータがありません。");
  }

  await db.transaction(async (tx: SQLite.Transaction) => {
    await deleteAll(tx);
  });

  await db.transaction(async (tx: SQLite.Transaction) => {
    await importAll(tx, items, itemDetails);
  });
};

const truncateItems = (tx: SQLite.Transaction): Promise<any> => {
  // アイテムを削除
  return new Promise(function(resolve, reject) {
    deleteItemAll(tx, (data: any, err: any) => {
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

const truncateItemDetails = (tx: SQLite.Transaction): Promise<any> => {
  // アイテム詳細を削除
  return new Promise(function(resolve, reject) {
    deleteItemDetailAll(tx, (data: any, err: any) => {
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

const deleteAll = (tx: SQLite.Transaction): Promise<any> => {
  return new Promise(function(
    resolve: () => void,
    reject: (error: Error) => void
  ) {
    try {
      Promise.all([truncateItems(tx), truncateItemDetails(tx)]).then(
        function() {
          resolve();
        }
      );
    } catch (err) {
      Sentry.captureMessage(err);
      reject(err);
    }
  });
};

const importItems = (tx: SQLite.Transaction, items: Item[]): Promise<any> => {
  // アイテムを作成
  return new Promise(function(resolve, reject) {
    bulkInsertItem(tx, items, (data: any, err: any) => {
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
  tx: SQLite.Transaction,
  itemDetail: ItemDetail[]
): Promise<any> => {
  // アイテム詳細を作成
  return new Promise(function(resolve, reject) {
    bulkInsertItemDetail(tx, itemDetail, (data: any, err: any) => {
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
  tx: SQLite.Transaction,
  items: Item[],
  itemDetail: ItemDetail[]
): Promise<any> => {
  return new Promise(function(
    resolve: () => void,
    reject: (error: Error) => void
  ) {
    try {
      Promise.all([
        importItems(tx, items),
        importItemDetails(tx, itemDetail)
      ]).then(function() {
        resolve();
      });
    } catch (err) {
      Sentry.captureMessage(err);
      reject(err);
    }
  });
};
