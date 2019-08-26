import { SQLite } from "expo-sqlite";
import { success, error, ResultError } from "./";

export interface User {
  id?: number;
  uuid: string;
}

export const create = async (
  tx: SQLite.Transaction,
  callback?: (data: any, error: ResultError) => void
) => {
  return tx.executeSql(
    "create table if not exists users (id integer primary key not null, uuid string);",
    [],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const insert = async (
  tx: SQLite.Transaction,
  user: User,
  callback?: (insertId: number, error: ResultError) => void
) => {
  return tx.executeSql(
    "insert into users (uuid) values (?)",
    [user.uuid],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.insertId, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const select1st = async (
  tx: SQLite.Transaction,
  callback?: (data: User | null, error: ResultError) => void
) => {
  tx.executeSql(
    `select * from users;`,
    [],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array[0], callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};
