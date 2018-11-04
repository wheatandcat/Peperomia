import { SQLite } from "expo";

export interface ItemDetail {
  id?: number;
  itemId: number;
  title: string;
  memo: string;
  kind: string;
  moveMinutes: number;
  priority: number;
}

export const create = async (tx: SQLite.Transaction) => {
  return tx.executeSql(
    "create table if not exists item_details (" +
      "id integer primary key not null," +
      "itemId integer," +
      "title string," +
      "memo string," +
      "kind string," +
      "moveMinutes integer," +
      "priority integer" +
      ");"
  );
};

export const insert = async (
  tx: SQLite.Transaction,
  itemDetail: ItemDetail
) => {
  return tx.executeSql(
    "insert into item_details (itemId, title, memo, kind, moveMinutes, priority) values (?, ?, ?, ?, ?)",
    [
      String(itemDetail.itemId),
      itemDetail.title,
      itemDetail.memo,
      itemDetail.kind,
      String(itemDetail.moveMinutes),
      String(itemDetail.priority)
    ]
  );
};

export const select = async (tx: SQLite.Transaction) => {
  return tx.executeSql("select * from item_details");
};
