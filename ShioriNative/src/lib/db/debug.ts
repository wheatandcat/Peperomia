import { SQLite } from "expo";
import { KIND_PARK } from "../getKind";
import { create as createItem, insert as insertItem, Item } from "./item";
import {
  create as createItemDetail,
  insert as insertItemDetail,
  ItemDetail
} from "./itemDetail";

export const resetSql = async (tx: SQLite.Transaction) => {
  await createItem(tx);
  await createItemDetail(tx);
  await tx.executeSql("delete * from items");
  await tx.executeSql("delete * from item_details");

  const item: Item = {
    title: "葛西臨海公園",
    image: ""
  };
  await insertItem(tx, item);
  const itemDetail1: ItemDetail = {
    itemId: 1,
    title: "新宿駅",
    memo: "■行く場所\n・砂浜\n・水族園",
    kind: KIND_PARK,
    moveMinutes: 30,
    priority: 1
  };
  await insertItemDetail(tx, itemDetail1);
};
