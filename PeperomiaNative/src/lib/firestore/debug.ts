import firebase from '../system/firebase';
import { KIND_PARK } from 'peperomia-util';
import { Item, insert as insertItem } from './item';

export const resetQuery = async (
  db: firebase.firestore.Firestore,
  uid: string
) => {
  // デバッグ時はオフラインにする
  // await settingNetwork(false);

  const items: Item[] = [{ title: '葛西臨海公園', kind: KIND_PARK, uid }];

  items.map((item) => insertItem(db, item));
};
