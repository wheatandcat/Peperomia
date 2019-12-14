import * as firebase from 'firebase';
import 'firebase/firestore';
import { Item } from '../db/item';

export const findByUID = async (
  db: firebase.firestore.Firestore,
  uid: string
): Promise<Item[]> => {
  const qs = await db
    .collection('items')
    .where('uid', '==', uid)
    .get();

  const records: any = qs.docs.map(elem => {
    return elem.data();
  });

  return records;
};
