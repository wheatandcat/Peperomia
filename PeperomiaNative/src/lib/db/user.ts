import * as SQLite from 'expo-sqlite';
import { success, error, list } from './';

export type User = {
  id?: number;
  uuid: string;
};

export const create = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: any, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'create table if not exists users (id integer primary key not null, uuid string);',
    [],
    (_, props) => success(list(props.rows), callback),
    (_, err) => error(err, callback)
  );
};

export const insert = async (
  tx: SQLite.SQLTransaction,
  user: User,
  callback?: (insertId: number, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'insert into users (uuid) values (?)',
    [user.uuid],
    (_, props) => success(props.insertId, callback),
    (_, err) => error(err, callback)
  );
};

export const select1st = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: User | null, error: SQLite.SQLError | null) => void
) => {
  tx.executeSql(
    'select * from users;',
    [],
    (_, props) => success(props.rows.item(0), callback),
    (_, err) => error(err, callback)
  );
};
