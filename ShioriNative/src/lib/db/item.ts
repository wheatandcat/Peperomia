import { SQLite } from "expo";
import { success, error } from "./";

export interface Item {
  id?: number;
  title: string;
  image: string;
}

export const create = async (
  tx: SQLite.Transaction,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "create table if not exists items (id integer primary key not null, title string,image string);",
    [],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};

export const insert = async (
  tx: SQLite.Transaction,
  item: Item,
  callback?: (insertId: number, error: any) => void
) => {
  return tx.executeSql(
    "insert into items (title, image) values (?, ?)",
    [item.title, item.image],
    (_, props) => success(props.insertId, callback),
    (_, err) => error(err, callback)
  );
};

export const select = async (
  tx: SQLite.Transaction,
  callback?: (data: any, error: any) => void
) => {
  tx.executeSql(
    `select * from items;`,
    [],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};
