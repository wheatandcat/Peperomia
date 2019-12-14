import * as SQLite from 'expo-sqlite';
import { create as createItem } from './item';
import { create as createItemDetail } from './itemDetail';
import { create as createUser } from './user';
import { create as createCalendar } from './calendar';

export const db: any = SQLite.openDatabase('db.db');
export type ResultError = Error | null;

export const success = (
  data: any,
  callback?: (data: any, error: ResultError) => void
) => {
  if (!callback) {
    return;
  }
  callback(data, null);
};

export const error = (
  err: ResultError,
  callback?: (data: any, err: ResultError) => void
) => {
  console.log(err);
  if (!callback) {
    return;
  }
  callback(null, err);
};

export const init = (tx: SQLite.Transaction) => {
  createItem(tx);
  createItemDetail(tx);
  createUser(tx);
  createCalendar(tx);
};
