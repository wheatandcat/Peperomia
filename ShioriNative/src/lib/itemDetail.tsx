import { SQLite } from "expo";
import { delete1st, selectByItemId, ItemDetail, update } from "./db/itemDetail";

export const deleteItemDetail = (
  tx: SQLite.Transaction,
  id: string,
  itemId: string,
  callback: (data: any, error: any) => void
) => {
  delete1st(tx, id, (data, error) => {
    if (error) {
      callback(data, error);
      return;
    }

    sortItemDetail(tx, itemId, callback);
  });
};

const sortItemDetail = (
  tx: SQLite.Transaction,
  itemId: string,
  callback: (data: any, error: any) => void
) => {
  selectByItemId(tx, itemId, (data: any, error: any) => {
    if (error) {
      callback(data, error);
      return;
    }

    data.array.forEach((item: ItemDetail, index: number) => {
      item.priority = index + 1;
      update(tx, item, callback);
    });
  });
};
