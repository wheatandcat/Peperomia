import * as firebase from 'firebase';
import 'firebase/firestore';
import { ItemDetail as ItemDetailParam } from '../../domain/itemDetail';

export type ItemDetail = ItemDetailParam & {
  id?: string;
  itemId: string;
  uid: string;
};

const collectionName = 'itemDetails';

export const findByUID = async (
  db: firebase.firestore.Firestore,
  uid: string
): Promise<ItemDetail[]> => {
  const qs = await db
    .collection(collectionName)
    .where('uid', '==', uid)
    .get();

  const records: any = qs.docs.map(elem => {
    return elem.data();
  });

  return records;
};

export const findByItemID = async (
  db: firebase.firestore.Firestore,
  uid: string,
  itemID: string
): Promise<ItemDetail[]> => {
  const qs = await db
    .collection(collectionName)
    .where('uid', '==', uid)
    .where('itemId', '==', itemID)
    .orderBy('priority')
    .get();

  const records = qs.docs.map(elem => {
    return elem.data();
  });

  return records as ItemDetail[];
};
