import { SQLite } from "expo-sqlite";
import { success, error } from "./";

export const migrationV1040 = async (
  tx: SQLite.Transaction,
  callback?: (error: any) => void
) => {
  const query = `alter table item_details add column place string;`;

  return tx.executeSql(
    query,
    [],
    (_: any, props: any) => success(props, callback),
    (_: any, err: any) => {
      error(err, callback);
    }
  );
};

export const migrationV1041 = async (
  tx: SQLite.Transaction,
  callback?: (error: any) => void
) => {
  const query = `alter table item_details add column url string;`;

  return tx.executeSql(
    query,
    [],
    (_: any, props: any) => success(props, callback),
    (_: any, err: any) => {
      error(err, callback);
    }
  );
};
