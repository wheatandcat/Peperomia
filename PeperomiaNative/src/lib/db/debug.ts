import { SQLite } from "expo";
import { create as createItem, insert as insertItem, Item } from "./item";
import {
  create as createItemDetail,
  insert as insertItemDetail,
  ItemDetail
} from "./itemDetail";
import { create as createUser } from "./user";
import {
  KIND_FISHING,
  KIND_LUNCH,
  KIND_AMUSEMENT_PARK,
  KIND_PARK,
  KIND_ART_MUSEUM,
  KIND_HOTEL,
  KIND_HOME,
  KIND_AQUARIUM,
  KIND_DEFAULT,
  KIND_CASTLE,
  KIND_ZOO,
  KIND_COFFEE,
  KIND_SHOP,
  KIND_TRAIN,
  KIND_MOVIE,
  KIND_BEACH,
  KIND_CHERRY_BLOSSOM,
  KIND_SHIP
} from "../getKind";

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
      memo: "",
      moveMinutes: 30,
      priority: 1
    },
    {
      itemId: 1,
      title: "葛西臨海公園",
      kind: KIND_PARK,
      memo: "■行く場所\n・砂浜\n・水族園",
      moveMinutes: 15,
      priority: 2
    },
    {
      itemId: 1,
      title: "葛西臨海公園　水上バス",
      kind: KIND_SHIP,
      memo: "",
      moveMinutes: 120,
      priority: 3
    },
    {
      itemId: 1,
      title: "浅草寺二天門前",
      kind: KIND_DEFAULT,
      memo: "",
      moveMinutes: 0,
      priority: 4
    },
    {
      itemId: 2,
      title: "市ヶ谷駅",
      kind: KIND_TRAIN,
      memo: "",
      moveMinutes: 0,
      priority: 1
    },
    {
      itemId: 2,
      title: "市ヶ谷フィッシュセンター",
      kind: KIND_FISHING,
      memo: "",
      moveMinutes: 120,
      priority: 2
    },
    {
      itemId: 3,
      title: "新宿駅",
      kind: KIND_TRAIN,
      memo: "",
      moveMinutes: 0,
      priority: 1
    },
    {
      itemId: 3,
      title: "TOHOシネマズ 新宿",
      kind: KIND_MOVIE,
      memo: "",
      moveMinutes: 0,
      priority: 2
    },
    {
      itemId: 3,
      title: "新宿御苑",
      kind: KIND_PARK,
      memo: "",
      moveMinutes: 0,
      priority: 3
    },
    {
      itemId: 4,
      title: "飯田橋駅",
      kind: KIND_TRAIN,
      memo: "",
      moveMinutes: 0,
      priority: 1
    },
    {
      itemId: 4,
      title: "お花見",
      kind: KIND_CHERRY_BLOSSOM,
      memo: "",
      moveMinutes: 30,
      priority: 2
    },
    {
      itemId: 4,
      title: "カナルカフェ",
      kind: KIND_COFFEE,
      memo: "",
      moveMinutes: 0,
      priority: 3
    },
    {
      itemId: 4,
      title: "買い物",
      kind: KIND_SHOP,
      memo: "",
      moveMinutes: 0,
      priority: 4
    },
    {
      itemId: 5,
      title: "上野駅",
      kind: KIND_TRAIN,
      memo: "",
      moveMinutes: 10,
      priority: 1
    },
    {
      itemId: 5,
      title: "上野動物園",
      kind: KIND_ZOO,
      memo: "",
      moveMinutes: 30,
      priority: 2
    },
    {
      itemId: 5,
      title: "上野の森美術館",
      kind: KIND_ART_MUSEUM,
      memo: "",
      moveMinutes: 0,
      priority: 3
    }
  ];

  items.map(item => insertItem(tx, item));
  itemDetails.map(itemDetail => insertItemDetail(tx, itemDetail));
};
