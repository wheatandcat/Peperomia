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
      share: true,
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

export const updateShare = async (doc: string, share: boolean) => {
  try {
    const planDocRef = db.collection("plans").doc(doc);

    await planDocRef.update({
      share,
      createDate: new Date()
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const isShare = async (doc: string): Promise<Boolean> => {
  const documentSnapshot = await db
    .collection("plans")
    .doc(doc)
    .get();

  const result: any = documentSnapshot.data();
  console.log(result);

  if (!result) {
    return false;
  }

  return result.share;
};
