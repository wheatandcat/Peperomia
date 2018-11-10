import { SQLite } from "expo";
import { success, error } from "./";

export interface ItemDetail {
  id?: number;
  itemId: number;
  title: string;
  memo: string;
  kind: string;
  moveMinutes: number;
  priority: number;
}

export const create = async (
  tx: SQLite.Transaction,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "create table if not exists item_details (" +
      "id integer primary key not null," +
      "itemId integer," +
      "title string," +
      "memo string," +
      "kind string," +
      "moveMinutes integer," +
      "priority integer" +
      ");",
    [],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};

export const insert = async (
  tx: SQLite.Transaction,
  itemDetail: ItemDetail,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "insert into item_details (itemId, title, memo, kind, moveMinutes, priority) values (?, ?, ?, ?, ?, ?)",
    [
      String(itemDetail.itemId),
      itemDetail.title,
      itemDetail.memo,
      itemDetail.kind,
      String(itemDetail.moveMinutes),
      String(itemDetail.priority)
    ],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};

export const select = async (
  tx: SQLite.Transaction,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "select * from item_details",
    [],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};

export const selectByItemId = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "select * from item_details where itemId = ?",
    [id],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};
