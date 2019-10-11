import * as SQLite from "expo-sqlite";
import { success, error, ResultError } from "./";

export type Calendar = {
  id?: number;
  itemId: number;
  date: string;
};

export const create = async (
  tx: SQLite.Transaction,
  callback?: (data: any, error: ResultError) => void
) => {
  return tx.executeSql(
    "create table if not exists calendars (" +
      "id integer primary key not null," +
      "itemId integer," +
      "date string" +
      ");",
    [],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const insert = async (
  tx: SQLite.Transaction,
  calendar: Calendar,
  callback?: (insertId: number, error: ResultError) => void
) => {
  return tx.executeSql(
    "insert into calendars (itemId, date) values (?, ?)",
    [String(calendar.itemId), calendar.date],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.insertId, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const select1st = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (data: Calendar, error: ResultError) => void
) => {
  return tx.executeSql(
    "select * from calendars where id = ? limit 1",
    [id],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array[0], callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};
