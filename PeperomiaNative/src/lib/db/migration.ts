import * as SQLite from 'expo-sqlite';
import { success, error } from './';

export const migrationV1040 = async (
  tx: SQLite.SQLTransaction,
  callback?: (error: SQLite.SQLError) => void
) => {
  const query = 'alter table item_details add column place string;';

  return tx.executeSql(
    query,
    [],
    (_, props) => success(props, callback),
    (_, err) => {
      return error(err, callback);
    }
  );
};

export const migrationV1041 = async (
  tx: SQLite.SQLTransaction,
  callback?: (error: SQLite.SQLError) => void
) => {
  const query = 'alter table item_details add column url string;';

  return tx.executeSql(
    query,
    [],
    (_, props) => success(props, callback),
    (_, err) => {
      return error(err, callback);
    }
  );
};
