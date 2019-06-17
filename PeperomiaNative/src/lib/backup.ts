import { SQLite } from "expo";
import { db } from "./db";
import { select as selectItems, Item } from "./db/item";
import { select as selectItemDetails, ItemDetail } from "./db/itemDetail";

interface Backup {
  items: Item[];
  itemDetails: ItemDetail[];
}

export default (): Promise<any> => {
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
    selectItemDetails(tx, (data: any, error: any) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(data);
      return;
    });
  });
};
