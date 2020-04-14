import firebase from '../system/firebase';
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
  const qs = await db.collection(collectionName).where('uid', '==', uid).get();

  const records: any = qs.docs.map((elem) => {
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
    .orderBy('priority', 'asc')
    .get();

  const records = qs.docs.map((elem) => {
    return elem.data();
  });

  return records as ItemDetail[];
};

export const countByItemID = async (
  db: firebase.firestore.Firestore,
  uid: string,
  itemID: string
): Promise<number> => {
  const qs = await db
    .collection(collectionName)
    .where('uid', '==', uid)
    .where('itemId', '==', itemID)
    .orderBy('priority')
    .get();

  return qs.size;
};

export const findByID = async (
  db: firebase.firestore.Firestore,
  uid: string,
  id: string
): Promise<ItemDetail> => {
  const qs = await db
    .collection(collectionName)
    .where('uid', '==', uid)
    .where('id', '==', id)
    .limit(1)
    .get();

  const records = qs.docs.map((elem) => {
    return elem.data();
  });

  return records[0] as ItemDetail;
};
