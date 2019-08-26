import { SQLite } from "expo-sqlite";
import { create as createItem } from "./item";
import { create as createItemDetail } from "./itemDetail";
import { create as createUser } from "./user";

export const db: any = SQLite.openDatabase("db.db");
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
  error: ResultError,
  callback?: (data: any, error: ResultError) => void
) => {
  console.log(error);
  if (!callback) {
    return;
  }
  callback(null, error);
};

export const init = (tx: SQLite.Transaction) => {
  //tx.executeSql("drop table items");
  //tx.executeSql("drop table item_details");
  //tx.executeSql("drop table users");

  createItem(tx);
  createItemDetail(tx);
  createUser(tx);
};
