import * as SQLite from 'expo-sqlite';
import { selectByItemId, select1st, insert } from './db/itemDetail';
import {
  CreateItemDetailRequest,
  CreateItemDetailResponse,
} from '../domain/request';
import { ItemDetail } from '../domain/itemDetail';
import { db } from '../lib/db/';
import { findByItemID, findByID } from './firestore/itemDetail';
import { getFireStore } from './firebase';
import { getIdToken } from './auth';
import { post } from './fetch';

export async function getItemDetails<T>(
  uid: string | null,
  itemID: string
): Promise<T> {
  if (uid) {
    const firestore = getFireStore();
    return (await findByItemID(firestore, uid, itemID)) as any;
  } else {
    return new Promise(function(resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        selectByItemId(tx, itemID, (data, err) => {
          if (err) {
            reject([]);
            return;
          }

          resolve(data as any);
          return;
        });
      });
    });
  }
}

export async function getItemDetailByID<T>(
  uid: string | null,
  id: string
): Promise<T> {
  if (uid) {
    const firestore = getFireStore();
    return (await findByID(firestore, uid, id)) as any;
  } else {
    return new Promise(function(resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        select1st(tx, id, (data, err) => {
          if (err) {
            reject({});
            return;
          }

          resolve(data as any);
          return;
        });
      });
    });
  }
}

export async function createItemDetail(
  uid: string | null,
  itemDetail: ItemDetail & { itemId: string | number }
): Promise<number | string | null | undefined> {
  if (uid) {
    const idToken = (await getIdToken()) || '';
    const response = await post<
      CreateItemDetailRequest,
      CreateItemDetailResponse
    >(
      'CreateItemDetail',
      {
        itemDetail: {
          ...itemDetail,
          itemId: String(itemDetail.itemId),
        },
      },
      idToken
    );
    if (response.error) {
      return null;
    }

    return response.body.id;
  } else {
    return new Promise(function(resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        const v = { ...itemDetail, itemId: Number(itemDetail.itemId) };

        insert(tx, v, (insertId, err) => {
          if (err) {
            reject(null);
            return;
          }

          resolve(insertId as any);
          return;
        });
      });
    });
  }
}
