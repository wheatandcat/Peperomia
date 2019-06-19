import { SQLite } from "expo";
import { success, error } from "./";

export interface ItemDetailParam {
  title: string;
  kind: string;
  memo: string;
  moveMinutes: number;
  priority: number;
}

export interface ItemDetail extends ItemDetailParam {
  id?: number;
  itemId: number;
}

export const create = async (
  tx: SQLite.Transaction,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "create table if not exists item_details (" +
      "id integer primary key not null," +
      "itemId integer," +
      "title string," +
      "kind string," +
      "memo string," +
      "moveMinutes integer," +
      "priority integer" +
      ");",
    [],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};

export const insert = async (
  tx: SQLite.Transaction,
  itemDetail: ItemDetail,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "insert into item_details (itemId, title, kind, memo, moveMinutes, priority) values (?, ?, ?, ?, ?, ?)",
    [
      String(itemDetail.itemId),
      itemDetail.title,
      itemDetail.kind,
      itemDetail.memo,
      String(itemDetail.moveMinutes),
      String(itemDetail.priority)
    ],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};

export const update = async (
  tx: SQLite.Transaction,
  itemDetail: ItemDetail,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "update item_details set title = ?, kind = ?, memo = ?, moveMinutes = ?, priority = ? where id = ?",
    [
      itemDetail.title,
      itemDetail.kind,
      itemDetail.memo,
      String(itemDetail.moveMinutes),
      String(itemDetail.priority),
      String(itemDetail.id)
    ],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};

export const select = async (
  tx: SQLite.Transaction,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "select * from item_details",
    [],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};

export const selectByItemId = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "select * from item_details where itemId = ? order by priority",
    [id],
    (_, props) => success(props.rows._array, callback),
    (_, err) => error(err, callback)
  );
};

export const select1st = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "select * from item_details where id = ? limit 1",
    [id],
    (_, props) => success(props.rows._array[0], callback),
    (_, err) => error(err, callback)
  );
};

export const sortItemDetail = (
  tx: SQLite.Transaction,
  itemDetails: ItemDetail[],
  callback: (data: any, error: any) => void
) => {
  itemDetails.forEach((item: ItemDetail, index: number) => {
    item.priority = index + 1;
    update(tx, item, callback);
  });
};

export const countByItemId = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (data: any, error: any) => void
) => {
  return tx.executeSql(
    "select count(id) as count from item_details where itemId = ?",
    [id],
    (_, props) => success(props.rows._array[0].count, callback),
    (_, err) => error(err, callback)
  );
};

export const delete1st = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (data: any, error: any) => void
) => {
  tx.executeSql(
    `delete from item_details where id = ?;`,
    [id],
    (_, props) => success(props.rows._array[0], callback),
    (_, err) => error(err, callback)
  );
};

export const deleteByItemId = async (
  tx: SQLite.Transaction,
  id: string,
  callback?: (data: any, error: any) => void
) => {
  tx.executeSql(
    `delete from item_details where itemId = ?;`,
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
    `delete from item_details;`,
    [],
    (_, props) => success(props.rows._array[0], callback),
    (_, err) => error(err, callback)
  );
};

export const bulkInsert = async (
  tx: SQLite.Transaction,
  itemDetails: ItemDetail[],
  callback?: (insertId: number, error: any) => void
) => {
  const param = itemDetails
    .map(itemDetail => {
      return [
        String(itemDetail.id),
        String(itemDetail.itemId),
        itemDetail.title,
        itemDetail.kind,
        itemDetail.memo,
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
      return `(?, ?, ?, ?, ?, ?, ?)`;
    })
    .join(",");

  const query = `insert into item_details (id, itemId, title, kind, memo, moveMinutes, priority) values ${q};`;

  return tx.executeSql(
    query,
    param,
    (_, props) => success(props, callback),
    (_, err) => {
      error(err, callback);
    }
  );
};
