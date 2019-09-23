import * as SQLite from "expo-sqlite";
import { create as createItem, insert as insertItem, Item } from "./item";
import {
  create as createItemDetail,
  insert as insertItemDetail,
  ItemDetail
} from "./itemDetail";
import { create as createUser } from "./user";
import {
  KIND_FISHING,
  KIND_PARK,
  KIND_ART_MUSEUM,
  KIND_DEFAULT,
  KIND_ZOO,
  KIND_COFFEE,
  KIND_SHOP,
  KIND_TRAIN,
  KIND_MOVIE,
  KIND_CHERRY_BLOSSOM,
  KIND_SHIP
} from "../getKind";
import { success, error, ResultError } from "./";

export const deleteSql = (tx: SQLite.Transaction) => {
  tx.executeSql("drop table items");
  tx.executeSql("drop table item_details");

  createItem(tx);
  createItemDetail(tx);
};

export const deleteUserSql = (tx: SQLite.Transaction) => {
  tx.executeSql("drop table users");

  createUser(tx);
};

export const resetSql = (tx: SQLite.Transaction) => {
  deleteSql(tx);

  const items: Item[] = [
    { title: "葛西臨海公園", kind: KIND_PARK, image: "" },
    {
      title: "市ヶ谷フィッシュセンター",
      kind: KIND_FISHING,
      image: ""
    },
    {
      title: "TOHOシネマズ 新宿",
      kind: KIND_MOVIE,
      image: ""
    },
    {
      title: "お花見",
      kind: KIND_CHERRY_BLOSSOM,
      image: ""
    },
    {
      title: "上野動物園",
      kind: KIND_ZOO,
      image: ""
    }
  ];

  const itemDetails: ItemDetail[] = [
    {
      itemId: 1,
      title: "新宿駅",
      kind: KIND_TRAIN,
      url: "",
      place: "西口に10:00",
      memo: "",
      moveMinutes: 30,
      priority: 1
    },
    {
      itemId: 1,
      title: "葛西臨海公園",
      kind: KIND_PARK,
      url: "https://www.tokyo-park.or.jp/park/format/index026.html",
      place: "駐車場に集合",
      memo: "■行く場所\n・砂浜\n・水族園",
      moveMinutes: 15,
      priority: 2
    },
    {
      itemId: 1,
      title: "葛西臨海公園　水上バス",
      kind: KIND_SHIP,
      url: "",
      place: "",
      memo: "",
      moveMinutes: 120,
      priority: 3
    },
    {
      itemId: 1,
      title: "浅草寺二天門前",
      kind: KIND_DEFAULT,
      url: "",
      place: "",
      memo: "",
      moveMinutes: 0,
      priority: 4
    },
    {
      itemId: 2,
      title: "市ヶ谷駅",
      kind: KIND_TRAIN,
      url: "",
      place: "",
      memo: "",
      moveMinutes: 0,
      priority: 1
    },
    {
      itemId: 2,
      title: "市ヶ谷フィッシュセンター",
      url: "",
      place: "",
      kind: KIND_FISHING,
      memo: "",
      moveMinutes: 120,
      priority: 2
    },
    {
      itemId: 3,
      title: "新宿駅",
      kind: KIND_TRAIN,
      url: "",
      place: "",
      memo: "",
      moveMinutes: 0,
      priority: 1
    },
    {
      itemId: 3,
      title: "TOHOシネマズ 新宿",
      kind: KIND_MOVIE,
      url: "",
      place: "",
      memo: "",
      moveMinutes: 0,
      priority: 2
    },
    {
      itemId: 3,
      title: "新宿御苑",
      kind: KIND_PARK,
      url: "",
      place: "",
      memo: "",
      moveMinutes: 0,
      priority: 3
    },
    {
      itemId: 4,
      title: "飯田橋駅",
      kind: KIND_TRAIN,
      url: "",
      place: "",
      memo: "",
      moveMinutes: 0,
      priority: 1
    },
    {
      itemId: 4,
      title: "お花見",
      kind: KIND_CHERRY_BLOSSOM,
      url: "",
      place: "",
      memo: "",
      moveMinutes: 30,
      priority: 2
    },
    {
      itemId: 4,
      title: "カナルカフェ",
      kind: KIND_COFFEE,
      url: "",
      place: "",
      memo: "",
      moveMinutes: 0,
      priority: 3
    },
    {
      itemId: 4,
      title: "買い物",
      kind: KIND_SHOP,
      url: "",
      place: "",
      memo: "",
      moveMinutes: 0,
      priority: 4
    },
    {
      itemId: 5,
      title: "上野駅",
      kind: KIND_TRAIN,
      url: "",
      place: "",
      memo: "",
      moveMinutes: 10,
      priority: 1
    },
    {
      itemId: 5,
      title: "上野動物園",
      kind: KIND_ZOO,
      url: "",
      place: "",
      memo: "",
      moveMinutes: 30,
      priority: 2
    },
    {
      itemId: 5,
      title: "上野の森美術館",
      kind: KIND_ART_MUSEUM,
      url: "",
      place: "",
      memo: "",
      moveMinutes: 0,
      priority: 3
    }
  ];

  items.map(item => insertItem(tx, item));
  itemDetails.map(itemDetail => insertItemDetail(tx, itemDetail));
};

export const resetSqlV100 = (tx: SQLite.Transaction) => {
  tx.executeSql("drop table items");
  tx.executeSql("drop table item_details");

  createItem(tx);
  createItemDetailV100(tx);
};

export const createItemDetailV100 = async (
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
      "moveMinutes integer," +
      "priority integer" +
      ");",
    [],
    (_: SQLite.Transaction, props: SQLite.ResultSet) =>
      success(props.rows._array, callback),
    (_: SQLite.Transaction, err: ResultError) => error(err, callback)
  );
};

export const sqliteMaster = async (tx: SQLite.Transaction) => {
  return tx.executeSql(
    "select * from sqlite_master;",
    [],
    (_: SQLite.Transaction, props: SQLite.ResultSet) => {
      console.log(props.rows._array);
    },
    (_: SQLite.Transaction, err: ResultError) => {
      console.log(err);
    }
  );
};
