import { SQLite } from "expo";
import { KIND_PARK, KIND_TRAIN, KIND_SHIP, KIND_DEFAULT } from "../getKind";
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
    memo: "",
    kind: KIND_TRAIN,
    moveMinutes: 30,
    priority: 1
  };
  await insertItemDetail(tx, itemDetail1);

  const itemDetail2: ItemDetail = {
    itemId: 1,
    title: "葛西臨海公園",
    memo: "■行く場所\n・砂浜\n・水族園",
    kind: KIND_PARK,
    moveMinutes: 0,
    priority: 2
  };

  await insertItemDetail(tx, itemDetail2);

  const itemDetail3: ItemDetail = {
    itemId: 1,
    title: "葛西臨海公園水上バス",
    memo: "",
    kind: KIND_SHIP,
    moveMinutes: 0,
    priority: 3
  };

  await insertItemDetail(tx, itemDetail3);

  const itemDetail4: ItemDetail = {
    itemId: 1,
    title: "浅草寺二天門前",
    memo: "",
    kind: KIND_DEFAULT,
    moveMinutes: 0,
    priority: 4
  };

  await insertItemDetail(tx, itemDetail4);

  console.log("resetSql OK");
};
