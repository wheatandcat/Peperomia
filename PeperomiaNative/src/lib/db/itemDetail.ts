import { SQLite } from "expo-sqlite";
import { success, error, ResultError } from "./";

export interface ItemDetailParam {
  title: string;
  kind: string;
  memo: string;
  place: string;
  url: string;
  moveMinutes: number;
  priority: number;
}

export interface ItemDetail extends ItemDetailParam {
  id?: number;
  itemId: number;
}

export const create = async (
  tx: SQLite.Transaction,
  callback?: (data: any, error: ResultError) => void
) => {
  return tx.executeSql(
    "create table if not exists item_details (" +
      "id integer primary key not null," +
      "itemId integer," +
      "title string," +
      "kind string," +
      "memo string," +
      "place string," +
      "url string," +
      "moveMinutes integer," +
      "priority integer" +
      ");",
    [],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const insert = async (
  tx: SQLite.Transaction,
  itemDetail: ItemDetail,
  callback?: (insertId: number, error: ResultError) => void
) => {
  return tx.executeSql(
    "insert into item_details (itemId, title, kind, memo, place, url, moveMinutes, priority) values (?, ?, ?, ?, ?, ?, ?, ?)",
    [
      String(itemDetail.itemId),
      itemDetail.title,
      itemDetail.kind,
      itemDetail.memo,
      itemDetail.place,
      itemDetail.url,
      String(itemDetail.moveMinutes),
      String(itemDetail.priority)
    ],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.insertId, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const update = async (
  tx: SQLite.Transaction,
  itemDetail: ItemDetail,
  callback?: (data: ItemDetail[], error: ResultError) => void
) => {
  return tx.executeSql(
    "update item_details set title = ?, kind = ?, memo = ?, place = ?, url = ?, moveMinutes = ?, priority = ? where id = ?",
    [
      itemDetail.title,
      itemDetail.kind,
      itemDetail.memo,
      itemDetail.place,
      itemDetail.url,
      String(itemDetail.moveMinutes),
      String(itemDetail.priority),
      String(itemDetail.id)
    ],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const select = async (
  tx: SQLite.Transaction,
  callback?: (data: ItemDetail[], error: ResultError) => void
) => {
  return tx.executeSql(
    "select * from item_details",
    [],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const selectByItemId = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (data: ItemDetail[], error: ResultError) => void
) => {
  return tx.executeSql(
    "select * from item_details where itemId = ? order by priority",
    [id],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const select1st = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (data: ItemDetail, error: ResultError) => void
) => {
  return tx.executeSql(
    "select * from item_details where id = ? limit 1",
    [id],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array[0], callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const sortItemDetail = (
  tx: SQLite.Transaction,
  itemDetails: ItemDetail[],
  callback: (data: ItemDetail[], error: ResultError) => void
) => {
  itemDetails.forEach((item: ItemDetail, index: number) => {
    item.priority = index + 1;
    update(tx, item, callback);
  });
};

export const countByItemId = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (count: number, error: ResultError) => void
) => {
  return tx.executeSql(
    "select count(id) as count from item_details where itemId = ?",
    [id],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array[0].count, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const delete1st = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (data: ItemDetail, error: ResultError) => void
) => {
  tx.executeSql(
    `delete from item_details where id = ?;`,
    [id],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array[0], callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const deleteByItemId = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (data: ItemDetail[], error: ResultError) => void
) => {
  tx.executeSql(
    `delete from item_details where itemId = ?;`,
    [id],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const deleteAll = async (
  tx: SQLite.Transaction,
  callback?: (data: ItemDetail[], error: ResultError) => void
) => {
  tx.executeSql(
    `delete from item_details;`,
    [],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const bulkInsert = async (
  tx: SQLite.Transaction,
  itemDetails: ItemDetail[],
  callback?: (daat: ItemDetail[], error: ResultError) => void
) => {
  const param = itemDetails
    .map(itemDetail => {
      return [
        String(itemDetail.id),
        String(itemDetail.itemId),
        itemDetail.title,
        itemDetail.kind,
        itemDetail.memo,
        itemDetail.place,
        itemDetail.url,
        String(itemDetail.moveMinutes),
        String(itemDetail.priority)
      ];
    })
    .reduce((pre, current) => {
      pre.push(...current);
      return pre;
    }, []);

  const q = itemDetails
    .map(() => {
      return `(?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    })
    .join(",");

  const query = `insert into item_details (id, itemId, title, kind, memo, place, url, moveMinutes, priority) values ${q};`;

  return tx.executeSql(
    query,
    param,
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props, callback),
    (_: SQLite.Transaction, err: ResultError) => {
      error(err, callback);
    }
  );
};
