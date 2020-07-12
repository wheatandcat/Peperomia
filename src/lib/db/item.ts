import * as SQLite from 'expo-sqlite';
import { Item as ItemParam } from 'domain/item';
import { success, error, list } from './';

export type Item = ItemParam & {
  id?: number;
};

export const create = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: any, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'create table if not exists items (' +
      'id integer primary key not null,' +
      'title string,' +
      'kind string,' +
      'image string' +
      ');',
    [],
    (_, props) => success(list(props.rows), callback),
    (_, err) => error(err, callback)
  );
};

export const insert = async (
  tx: SQLite.SQLTransaction,
  item: Item,
  callback?: (insertId: number, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'insert into items (title, kind) values (?, ?)',
    [item.title, item.kind],
    (_, props) => success(props.insertId, callback),
    (_, err) => error(err, callback)
  );
};

export const update = async (
  tx: SQLite.SQLTransaction,
  item: Item,
  callback?: (data: Item[], error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'update items set title = ?, kind = ? where id = ?',
    [item.title, item.kind, String(item.id)],
    (_, props) => success(list(props.rows), callback),
    (_, err) => error(err, callback)
  );
};

export const select = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: Item[], error: SQLite.SQLError | null) => void
) => {
  tx.executeSql(
    'select * from items order by id desc;',
    [],
    (_, props) => success(list(props.rows), callback),
    (_, err) => error(err, callback)
  );
};

export const select1st = async (
  tx: SQLite.SQLTransaction,
  id: string,
  callback?: (data: Item, error: SQLite.SQLError | null) => void
) => {
  tx.executeSql(
    'select * from items where id = ?;',
    [id],
    (_, props) => success(props.rows.item(0), callback),
    (_, err) => error(err, callback)
  );
};

export const delete1st = async (
  tx: SQLite.SQLTransaction,
  id: string,
  callback?: (data: Item, error: SQLite.SQLError | null) => void
) => {
  tx.executeSql(
    'delete from items where id = ?;',
    [id],
    (_, props) => success(props.rows.item(0), callback),
    (_, err) => error(err, callback)
  );
};

export const deleteAll = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: Item, error: SQLite.SQLError | null) => void
) => {
  tx.executeSql(
    'delete from items;',
    [],
    (_, props) => success(props.rows.item(0), callback),
    (_, err) => error(err, callback)
  );
};

export const bulkInsert = async (
  tx: SQLite.SQLTransaction,
  items: Item[],
  callback?: (data: Item[], error: SQLite.SQLError | null) => void
) => {
  const param = items
    .map((item) => {
      return [String(item.id), item.title, item.kind];
    })
    .reduce((pre, current) => {
      pre.push(...current);
      return pre;
    }, []);

  const q = items
    .map(() => {
      return '(?, ?, ?)';
    })
    .join(',');

  const query = `insert into items (id, title, kind) values ${q};`;

  return tx.executeSql(
    query,
    param,
    (_, props) => {
      success(props, callback);
    },
    (_, err) => {
      return error(err, callback);
    }
  );
};
