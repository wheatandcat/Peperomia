import * as firebase from 'firebase';
import 'firebase/firestore';
import { Item as ItemParam } from '../../domain/item';
import { getUUID } from './';

export type Item = ItemParam & {
  id?: string;
  uid: string;
};

const collectionName = 'items';

export const insert = async (
  db: firebase.firestore.Firestore,
  item: Item
): Promise<boolean> => {
  try {
    item.id = getUUID(collectionName);
    const DocRef = db.collection(collectionName).doc(item.id);

    await DocRef.set(item);
    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const findByUID = async (
  db: firebase.firestore.Firestore,
  uid: string
): Promise<Item[]> => {
  const qs = await db
    .collection(collectionName)
    .where('uid', '==', uid)
    .get();

  const records = qs.docs.map(elem => {
    return elem.data();
  });

  return records as Item[];
};
