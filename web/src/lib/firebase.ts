import * as firebase from "firebase/app";
import "firebase/firestore";
import { firebaseConfig } from "../config/firebase";
import { Item, ItemDetail } from "./item";

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export interface Plan {
  item: Item;
  itemDetails: ItemDetail[];
  share: boolean;
  createDate: {
    seconds: number;
  };
}

export const getPlan = async (doc: string): Promise<Plan> => {
  const documentSnapshot = await db
    .collection("plans")
    .doc(doc)
    .get();

  const result: any = documentSnapshot.data();

  return result;
};

export const onSnapshot = async (
  doc: string,
  callback: (data: Plan) => void
) => {
  db.collection("plans")
    .doc(doc)
    .onSnapshot(function(doc) {
      const data: any = doc.data();

      callback(data);
    });
};
