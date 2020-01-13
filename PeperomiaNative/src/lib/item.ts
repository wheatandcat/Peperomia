import * as SQLite from 'expo-sqlite';
import { select, select1st, insert } from './db/item';
import { Item } from '../domain/item';
import { CreateItemRequest, CreateItemResponse } from '../domain/request';
import { db } from '../lib/db/';
import { findByUID, findByID } from './firestore/item';
import { getFireStore } from './firebase';
import { getIdToken } from './auth';
import { post } from './fetch';

export async function getItems<T>(uid: string | null): Promise<T> {
  if (uid) {
    const firestore = getFireStore();
    return (await findByUID(firestore, uid)) as any;
  } else {
    return new Promise(function(resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        select(tx, (data, err) => {
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

export async function getItemByID<T>(
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

export async function createItem(
  uid: string | null,
  item: Item
): Promise<number | string | null | undefined> {
  if (uid) {
    const idToken = (await getIdToken()) || '';
    const response = await post<CreateItemRequest, CreateItemResponse>(
      'CreateItem',
      {
        item,
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
        insert(tx, item, (insertId, err) => {
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
