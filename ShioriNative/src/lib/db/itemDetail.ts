import { SQLite } from "expo";
import { success, error } from "./";

export interface ItemDetail {
  id?: number;
  itemId: number;
  title: string;
  memo: string;
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
    "insert into item_details (itemId, title, memo, moveMinutes, priority) values (?, ?, ?, ?, ?)",
    [
      String(itemDetail.itemId),
      itemDetail.title,
      itemDetail.memo,
      String(itemDetail.moveMinutes),
      String(itemDetail.priority)
    ],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};

export const update = async (
  tx: SQLite.Transaction,
  itemDetail: ItemDetail,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "update item_details title = ?, memo = ?, moveMinutes = ? where id = ?",
    [
      itemDetail.title,
      itemDetail.memo,
      String(itemDetail.moveMinutes),
      String(itemDetail.id)
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

export const select1st = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "select * from item_details where id = ? limit 1",
    [id],
    (_, props) => success(props.rows._array[0], callback),
    (_, err) => error(err, callback)
  );
};
