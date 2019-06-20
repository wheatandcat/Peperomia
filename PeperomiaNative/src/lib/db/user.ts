import { SQLite } from "expo-sqlite";
import { success, error } from "./";

export interface User {
  id?: number;
  uuid: string;
}

export const create = async (
  tx: SQLite.Transaction,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "create table if not exists users (id integer primary key not null, uuid string);",
    [],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};

export const insert = async (
  tx: SQLite.Transaction,
  user: User,
  callback?: (insertId: number, error: any) => void
) => {
  return tx.executeSql(
    "insert into users (uuid) values (?)",
    [user.uuid],
    (_, props) => success(props.insertId, callback),
    (_, err) => error(err, callback)
  );
};

export const select1st = async (
  tx: SQLite.Transaction,
  callback?: (data: any, error: any) => void
) => {
  tx.executeSql(
    `select * from users;`,
    [],
    (_, props) => success(props.rows._array[0], callback),
    (_, err) => error(err, callback)
  );
};
