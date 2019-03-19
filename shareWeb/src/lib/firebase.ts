import * as firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/firebase";
import { Item, ItemDetail } from "./item";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export interface Plan {
  item: Item;
  itemDetails: ItemDetail[];
}

export const getPlan = async (doc: string): Promise<Plan> => {
  console.log("getPlan");

  const documentSnapshot = await db
    .collection("plans")
    .doc(doc)
    .get();

  const result: any = documentSnapshot.data();
  console.log(result);

  return result;
};
