import { SQLite } from "expo";

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
