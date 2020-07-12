import * as SQLite from 'expo-sqlite';
import { create as createItem } from './item';
import { create as createItemDetail } from './itemDetail';
import { create as createUser } from './user';
import { create as createCalendar } from './calendar';

export const db: any = SQLite.openDatabase('db.db');

export const success = (
  data: any,
  callback?: (data: any, error: SQLite.SQLError | null) => void
) => {
  if (!callback) {
    return;
  }
  callback(data, null);
};

export const error = (
  err: SQLite.SQLError,
  callback?: (data: any, err: SQLite.SQLError | null) => void
) => {
  console.log(err);
  if (!callback) {
    return false;
  }
  callback(null, err);

  return true;
};

export const init = (tx: SQLite.SQLTransaction) => {
  createItem(tx);
  createItemDetail(tx);
  createUser(tx);
  createCalendar(tx);
};

export const list = (rows: SQLite.SQLResultSetRowList) => {
  let rec = [];
  for (let i = 0; i < rows.length; i++) {
    rec.push(rows.item(i));
  }

  return rec;
};
