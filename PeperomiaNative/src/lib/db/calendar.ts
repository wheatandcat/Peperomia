import * as SQLite from 'expo-sqlite';
import { Calendar as CalendarParam } from '../../domain/calendar';
import { Item } from './item';
import { success, error, list } from './';

export type Calendar = CalendarParam & {
  id?: number;
  itemId: number;
};

export type SelectCalendar = Item & Calendar;

export const create = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: any, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'create table if not exists calendars (' +
      'id integer primary key not null,' +
      'itemId integer,' +
      'date string' +
      ');',
    [],
    (_, props) => success(list(props.rows), callback),
    (_, err) => error(err, callback)
  );
};

export const insert = async (
  tx: SQLite.SQLTransaction,
  calendar: Calendar,
  callback?: (insertId: number, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'insert into calendars (itemId, date) values (?, ?)',
    [String(calendar.itemId), calendar.date],
    (_, props) => success(props.insertId, callback),
    (_, err) => error(err, callback)
  );
};

export const update = async (
  tx: SQLite.SQLTransaction,
  calendar: Calendar,
  callback?: (data: Calendar, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'update calendars set date = ? where id = ?',
    [calendar.date, String(calendar.id)],
    (_, props) => success(props.rows.item(0), callback),
    (_, err) => error(err, callback)
  );
};

export const select = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: SelectCalendar[], error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'select * from calendars inner join items on calendars.itemId = items.id',
    [],
    (_, props) => success(list(props.rows), callback),
    (_, err) => error(err, callback)
  );
};

export const deleteByItemId = async (
  tx: SQLite.SQLTransaction,
  itemId: number,
  callback?: (data: Calendar, error: SQLite.SQLError | null) => void
) => {
  tx.executeSql(
    'delete from calendars where itemId = ?;',
    [String(itemId)],
    (_, props) => success(props.rows.item(0), callback),
    (_, err) => error(err, callback)
  );
};

export const selectAll = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: Calendar[], error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'select * from calendars',
    [],
    (_, props) => success(list(props.rows), callback),
    (_, err) => error(err, callback)
  );
};

export const deleteAll = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: Calendar, error: SQLite.SQLError | null) => void
) => {
  tx.executeSql(
    'delete from calendars;',
    [],
    (_, props) => success(props.rows.item(0), callback),
    (_, err) => error(err, callback)
  );
};

export const bulkInsert = async (
  tx: SQLite.SQLTransaction,
  calendars: Calendar[],
  callback?: (data: Calendar[], error: SQLite.SQLError | null) => void
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
      return '(?, ?, ?)';
    })
    .join(',');

  const query = `insert into calendars (id, itemId, date) values ${q};`;

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
