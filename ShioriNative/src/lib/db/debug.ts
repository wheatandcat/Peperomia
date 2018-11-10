import { SQLite } from "expo";
import { KIND_PARK, KIND_TRAIN, KIND_SHIP, KIND_DEFAULT } from "../getKind";
import { create as createItem, insert as insertItem, Item } from "./item";
import {
  create as createItemDetail,
  insert as insertItemDetail,
  ItemDetail
} from "./itemDetail";

export const resetSql = (tx: SQLite.Transaction) => {
  createItem(tx);
  createItemDetail(tx);

  tx.executeSql("delete from items");
  tx.executeSql("delete from item_details");

  const item: Item = { title: "葛西臨海公園", image: "" };
  insertItem(tx, item);

  const itemDetail1: ItemDetail = {
    itemId: 1,
    title: "新宿駅",
    memo: "",
    kind: KIND_TRAIN,
    moveMinutes: 30,
    priority: 1
  };
  insertItemDetail(tx, itemDetail1);

  const itemDetail2: ItemDetail = {
    itemId: 1,
    title: "葛西臨海公園",
    memo: "■行く場所\n・砂浜\n・水族園",
    kind: KIND_PARK,
    moveMinutes: 0,
    priority: 2
  };

  insertItemDetail(tx, itemDetail2);

  const itemDetail3: ItemDetail = {
    itemId: 1,
    title: "葛西臨海公園水上バス",
    memo: "",
    kind: KIND_SHIP,
    moveMinutes: 0,
    priority: 3
  };

  insertItemDetail(tx, itemDetail3);

  const itemDetail4: ItemDetail = {
    itemId: 1,
    title: "浅草寺二天門前",
    memo: "",
    kind: KIND_DEFAULT,
    moveMinutes: 0,
    priority: 4
  };

  insertItemDetail(tx, itemDetail4);

  console.log("resetSql OK");
};
