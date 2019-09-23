import * as SQLite from "expo-sqlite";
import { success, error, ResultError } from "./";

export const migrationV1040 = async (
  tx: SQLite.Transaction,
  callback?: (error: ResultError) => void
) => {
  const query = `alter table item_details add column place string;`;

  return tx.executeSql(
    query,
    [],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props, callback),
    (_: SQLite.Transaction, err: ResultError) => {
      error(err, callback);
    }
  );
};

export const migrationV1041 = async (
  tx: SQLite.Transaction,
  callback?: (error: ResultError) => void
) => {
  const query = `alter table item_details add column url string;`;

  return tx.executeSql(
    query,
    [],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props, callback),
    (_: SQLite.Transaction, err: ResultError) => {
      error(err, callback);
    }
  );
};
