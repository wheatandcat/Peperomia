import * as SQLite from "expo-sqlite";
import { Item } from "./item";
import { success, error, ResultError } from "./";

export type Calendar = {
  id?: number;
  itemId: number;
  date: string;
};

export type SelectCalendar = Item & Calendar;

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

export const update = async (
  tx: SQLite.Transaction,
  calendar: Calendar,
  callback?: (data: Calendar, error: ResultError) => void
) => {
  return tx.executeSql(
    "update calendars set date = ? where id = ?",
    [calendar.date, String(calendar.id)],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array[0], callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const select = async (
  tx: SQLite.Transaction,
  callback?: (data: SelectCalendar[], error: ResultError) => void
) => {
  return tx.executeSql(
    "select * from calendars inner join items on calendars.itemId = items.id",
    [],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const deleteByItemId = async (
  tx: SQLite.Transaction,
  itemId: number,
  callback?: (data: Calendar, error: ResultError) => void
) => {
  tx.executeSql(
    `delete from calendars where itemId = ?;`,
    [String(itemId)],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array[0], callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const selectAll = async (
  tx: SQLite.Transaction,
  callback?: (data: Calendar[], error: ResultError) => void
) => {
  return tx.executeSql(
    "select * from calendars",
    [],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const deleteAll = async (
  tx: SQLite.Transaction,
  callback?: (data: Calendar, error: ResultError) => void
) => {
  tx.executeSql(
    `delete from calendars;`,
    [],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array[0], callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const bulkInsert = async (
  tx: SQLite.Transaction,
  calendars: Calendar[],
  callback?: (data: Calendar[], error: ResultError) => void
) => {
  const param = calendars
    .map(calendar => {
      return [String(calendar.id), calendar.itemId, calendar.date];
    })
    .reduce((pre, current) => {
      pre.push(...current);
      return pre;
    }, []);

  const q = calendars
    .map(() => {
      return `(?, ?, ?)`;
    })
    .join(",");

  const query = `insert into calendars (id, itemId, date) values ${q};`;

  return tx.executeSql(
    query,
    param,
    (_: SQLite.Transaction, props: SQLite.ResultSet) => {
      success(props, callback);
    },
    (_: SQLite.Transaction, err: ResultError) => {
      error(err, callback);
    }
  );
};
