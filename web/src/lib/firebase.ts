import * as firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/firebase";
import { Item, ItemDetail } from "./item";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export interface Plan extends Item {
  itemDetail: ItemDetail;
}

export const getPlan = async () => {
  const snapShot = await db
    .collection("plans")
    .where("id", "==", 1)
    .get();

  // docsをmapする
  const data = snapShot.docs.map(doc => {
    return doc.data();
  });

  const result = data ? data[0] : null;
  console.log(result);

  return result;
};
