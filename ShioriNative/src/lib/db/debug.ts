import { SQLite } from "expo";
import { create as createItem, insert as insertItem, Item } from "./item";
import {
  create as createItemDetail,
  insert as insertItemDetail,
  ItemDetail
} from "./itemDetail";

export const deleteSql = (tx: SQLite.Transaction) => {
  tx.executeSql("drop table items");
  tx.executeSql("drop table item_details");

  createItem(tx);
  createItemDetail(tx);

  tx.executeSql("delete from items");
  tx.executeSql("delete from item_details");
};

export const resetSql = (tx: SQLite.Transaction) => {
  deleteSql(tx);

  const item1: Item = { title: "葛西臨海公園", image: "" };
  insertItem(tx, item1);

  const itemDetail1: ItemDetail = {
    itemId: 1,
    title: "新宿駅",
    memo: "",
    moveMinutes: 30,
    priority: 1
  };
  insertItemDetail(tx, itemDetail1);

  const itemDetail2: ItemDetail = {
    itemId: 1,
    title: "葛西臨海公園",
    memo: "■行く場所\n・砂浜\n・水族園",
    moveMinutes: 0,
    priority: 2
  };

  insertItemDetail(tx, itemDetail2);

  const itemDetail3: ItemDetail = {
    itemId: 1,
    title: "葛西臨海公園水上バス",
    memo: "",
    moveMinutes: 0,
    priority: 3
  };

  insertItemDetail(tx, itemDetail3);

  const itemDetail4: ItemDetail = {
    itemId: 1,
    title: "浅草寺二天門前",
    memo: "",
    moveMinutes: 0,
    priority: 4
  };

  insertItemDetail(tx, itemDetail4);

  const item2: Item = { title: "市ヶ谷フィッシュセンター", image: "" };
  insertItem(tx, item2);

  const itemDetail5: ItemDetail = {
    itemId: 2,
    title: "市ヶ谷駅",
    memo: "",
    moveMinutes: 0,
    priority: 1
  };
  insertItemDetail(tx, itemDetail5);

  const itemDetail6: ItemDetail = {
    itemId: 2,
    title: "市ヶ谷フィッシュセンター",
    memo: "",
    moveMinutes: 120,
    priority: 2
  };
  insertItemDetail(tx, itemDetail6);
};
