import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "../config/firebase";
import { Item } from "./db/item";
import { ItemDetail } from "./db/itemDetail";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const save = async (
  userID: string,
  item: Item,
  itemDetails: ItemDetail[]
) => {
  const uuid = userID + item.id;

  try {
    const planDocRef = db.collection("plans").doc(uuid);
    const saveItem = {
      userID: userID,
      share: false,
      item: item,
      itemDetails: itemDetails,
      createDate: new Date()
    };

    await planDocRef.set(saveItem);

    return uuid;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateShare = async (
  userID: string,
  item: Item,
  share: boolean
) => {
  const uuid = userID + item.id;

  try {
    const planDocRef = db.collection("plans").doc(uuid);

    await planDocRef.update({
      share
    });

    return uuid;
  } catch (e) {
    console.log(e);
    return false;
  }
};
