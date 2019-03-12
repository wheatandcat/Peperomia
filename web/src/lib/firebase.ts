import * as firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/firebase";
import { Item, ItemDetail } from "./item";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export interface Plan extends Item {
  itemDetails: ItemDetail[];
}

export const getPlan = async (id: number): Promise<Plan> => {
  const snapShot = await db
    .collection("plans")
    .where("id", "==", id)
    .get();

  // docsをmapする
  const data = snapShot.docs.map(doc => {
    return doc.data();
  });

  const result: any = data ? data[0] : null;

  return result;
};
