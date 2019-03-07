import * as firebase from "firebase";
import "firebase/firestore";
import uuidv1 from "uuid/v1";
import { firebaseConfig } from "../config/firebase";
import { Item } from "./db/item";
import { ItemDetail } from "./db/itemDetail";

console.log(firebaseConfig);

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const save = async (item: Item, itemDetails: ItemDetail[]) => {
  const uuid = uuidv1();
  try {
    await db.collection("plans").add({
      uuid,
      ...item,
      itemDetails: itemDetails,
      createDate: new Date()
    });

    return uuid;
  } catch (e) {
    console.log(e);
    return false;
  }
};
