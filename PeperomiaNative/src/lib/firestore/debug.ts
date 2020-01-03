import * as firebase from 'firebase';
import 'firebase/firestore';
import { KIND_PARK } from '../getKind';
import { Item, insert as insertItem } from './item';

export const resetQuery = async (
  db: firebase.firestore.Firestore,
  uid: string
) => {
  // デバッグ時はオフラインにする
  // await settingNetwork(false);

  const items: Item[] = [
    { title: '葛西臨海公園', kind: KIND_PARK, image: '', uid },
  ];

  items.map(item => insertItem(db, item));
};