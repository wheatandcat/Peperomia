import { SQLite } from "expo";
import { success, error } from "./";

export interface Item {
  id?: number;
  title: string;
  kind: string;
  image: string;
}

export const create = async (
  tx: SQLite.Transaction,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "create table if not exists items (" +
      "id integer primary key not null," +
      "title string," +
      "kind string," +
      "image string" +
      ");",
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
    "insert into items (title, kind, image) values (?, ?, ?)",
    [item.title, item.kind, item.image],
    (_, props) => success(props.insertId, callback),
    (_, err) => error(err, callback)
  );
};

export const update = async (
  tx: SQLite.Transaction,
  item: Item,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "update items set title = ?, kind = ?, image = ? where id = ?",
    [item.title, item.kind, item.image, String(item.id)],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};

export const select = async (
  tx: SQLite.Transaction,
  callback?: (data: any, error: any) => void
) => {
  tx.executeSql(
    `select * from items order by id desc;`,
    [],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};

export const select1st = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (data: any, error: any) => void
) => {
  tx.executeSql(
    `select * from items where id = ?;`,
    [id],
    (_, props) => success(props.rows._array[0], callback),
    (_, err) => error(err, callback)
  );
};

export const delete1st = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (data: any, error: any) => void
) => {
  tx.executeSql(
    `delete from items where id = ?;`,
    [id],
    (_, props) => success(props.rows._array[0], callback),
    (_, err) => error(err, callback)
  );
};

export const deleteAll = async (
  tx: SQLite.Transaction,
  callback?: (data: any, error: any) => void
) => {
  tx.executeSql(
    `delete from items;`,
    [],
    (_, props) => success(props.rows._array[0], callback),
    (_, err) => error(err, callback)
  );
};

export const bulkInsert = async (
  tx: SQLite.Transaction,
  items: Item[],
  callback?: (insertId: number, error: any) => void
) => {
  const param = items
    .map(item => {
      return [String(item.id), item.title, item.kind, item.image];
    })
    .reduce((pre, current) => {
      pre.push(...current);
      return pre;
    }, []);

  const q = items
    .map(() => {
      return `(?, ?, ?, ?)`;
    })
    .join(",");

  const query = `insert into items (id, title, kind, image) values ${q};`;

  return tx.executeSql(
    query,
    param,
    (_, props) => {
      success(props, callback);
    },
    (_, err) => {
      error(err, callback);
    }
  );
};
