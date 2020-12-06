import * as SQLite from 'expo-sqlite';
import { ItemDetail as ItemDetailParam } from 'domain/itemDetail';
import { success, error, list } from './';

export type ItemDetail = ItemDetailParam & {
  id?: number;
  itemId: number;
};

export const create = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: any, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'create table if not exists item_details (' +
      'id integer primary key not null,' +
      'itemId integer,' +
      'title string,' +
      'kind string,' +
      'memo string,' +
      'place string,' +
      'url string,' +
      'moveMinutes integer,' +
      'priority integer' +
      ');',
    [],
    (_, props) => success(list(props.rows), callback),
    (_, err) => error(err, callback)
  );
};

export const insert = async (
  tx: SQLite.SQLTransaction,
  itemDetail: ItemDetail,
  callback?: (insertId: number, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'insert into item_details (itemId, title, kind, memo, place, url, moveMinutes, priority) values (?, ?, ?, ?, ?, ?, ?, ?)',
    [
      String(itemDetail.itemId),
      itemDetail.title,
      itemDetail.kind,
      itemDetail.memo,
      itemDetail.place,
      itemDetail.url,
      String(itemDetail.moveMinutes),
      String(itemDetail.priority),
    ],
    (_, props) => success(props.insertId, callback),
    (_, err) => error(err, callback)
  );
};

export const update = async (
  tx: SQLite.SQLTransaction,
  itemDetail: ItemDetail,
  callback?: (data: ItemDetail[], error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'update item_details set title = ?, kind = ?, memo = ?, place = ?, url = ?, moveMinutes = ?, priority = ? where id = ?',
    [
      itemDetail.title,
      itemDetail.kind,
      itemDetail.memo,
      itemDetail.place,
      itemDetail.url,
      String(itemDetail.moveMinutes),
      String(itemDetail.priority),
      String(itemDetail.id),
    ],
    (_, props) => success(list(props.rows), callback),
    (_, err) => error(err, callback)
  );
};

export const select = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: ItemDetail[], error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'select * from item_details',
    [],
    (_, props) => success(list(props.rows), callback),
    (_, err) => error(err, callback)
  );
};

export const selectByItemId = async (
  tx: SQLite.SQLTransaction,
  id: string,
  callback?: (data: ItemDetail[], error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'select * from item_details where itemId = ? order by priority',
    [id],
    (_, props) => success(list(props.rows), callback),
    (_, err) => error(err, callback)
  );
};

export const select1st = async (
  tx: SQLite.SQLTransaction,
  id: string,
  callback?: (data: ItemDetail, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'select * from item_details where id = ? limit 1',
    [id],
    (_, props) => success(props.rows.item(0), callback),
    (_, err) => error(err, callback)
  );
};

export const countByItemId = async (
  tx: SQLite.SQLTransaction,
  id: string,
  callback?: (count: number, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'select count(id) as count from item_details where itemId = ?',
    [id],
    (_, props) => success(props.rows.item(0).count, callback),
    (_, err) => error(err, callback)
  );
};

export const delete1st = async (
  tx: SQLite.SQLTransaction,
  id: string,
  callback?: (data: ItemDetail, error: SQLite.SQLError | null) => void
) => {
  tx.executeSql(
    'delete from item_details where id = ?;',
    [id],
    (_, props) => success(props.rows.item(0), callback),
    (_, err) => error(err, callback)
  );
};

export const deleteByItemId = async (
  tx: SQLite.SQLTransaction,
  id: string,
  callback?: (data: ItemDetail[], error: SQLite.SQLError | null) => void
) => {
  tx.executeSql(
    'delete from item_details where itemId = ?;',
    [id],
    (_, props) => success(list(props.rows), callback),
    (_, err) => error(err, callback)
  );
};

export const deleteAll = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: ItemDetail[], error: SQLite.SQLError | null) => void
) => {
  tx.executeSql(
    'delete from item_details;',
    [],
    (_, props) => success(list(props.rows), callback),
    (_, err) => error(err, callback)
  );
};

export const bulkInsert = async (
  tx: SQLite.SQLTransaction,
  itemDetails: ItemDetail[],
  callback?: (daat: ItemDetail[], error: SQLite.SQLError | null) => void
) => {
  const param = itemDetails
    .map((itemDetail) => {
      return [
        String(itemDetail.id),
        String(itemDetail.itemId),
        itemDetail.title,
        itemDetail.kind,
        itemDetail.memo,
        itemDetail.place,
        itemDetail.url,
        String(itemDetail.moveMinutes),
        String(itemDetail.priority),
      ];
    })
    .reduce((pre, current) => {
      pre.push(...current);
      return pre;
    }, []);

  const q = itemDetails
    .map(() => {
      return '(?, ?, ?, ?, ?, ?, ?, ?, ?)';
    })
    .join(',');

  const query = `insert into item_details (id, itemId, title, kind, memo, place, url, moveMinutes, priority) values ${q};`;

  return tx.executeSql(
    query,
    param,
    (_, props) => success(props, callback),
    (_, err) => {
      return error(err, callback);
    }
  );
};
