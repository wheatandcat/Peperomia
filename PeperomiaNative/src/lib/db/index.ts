import { SQLite } from "expo";
import { create as createItem } from "./item";
import { create as createItemDetail } from "./itemDetail";

export const db = SQLite.openDatabase("db.db");

export const success = (
  data: any,
  callback?: (data: any, error: any) => void
) => {
  if (!callback) {
    return;
  }
  callback(data, null);
};

export const error = (
  error: any,
  callback?: (data: any, error: any) => void
) => {
  console.log(error);
  if (!callback) {
    return;
  }
  callback(null, error);
};

export const init = (tx: SQLite.Transaction) => {
  createItem(tx);
  createItemDetail(tx);
};
