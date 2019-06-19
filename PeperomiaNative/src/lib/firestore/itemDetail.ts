import * as firebase from "firebase";
import "firebase/firestore";
import { ItemDetail } from "../db/itemDetail";

export const findByUID = async (
  db: firebase.firestore.Firestore,
  uid: string
): Promise<ItemDetail[]> => {
  const qs = await db
    .collection("itemDetails")
    .where("uid", "==", uid)
    .get();

  const records: any = qs.docs.map(elem => {
    return elem.data();
  });

  return records;
};
