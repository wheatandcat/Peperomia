import * as SQLite from 'expo-sqlite';
import { select, select1st, insert, update, delete1st } from './db/item';
import { deleteByItemId as deleteItenDetailByItemId } from './db/itemDetail';
import { deleteByItemId as deleteCalendarByItemId } from './db/calendar';
import { Item, UpdateItem, DeleteItem, SelectItem } from '../domain/item';
import { UID } from '../domain/user';
import {
  CreateItemRequest,
  CreateItemResponse,
  UpdateItemRequest,
  UpdateItemResponse,
  DeleteItemRequest,
  DeleteItemResponse,
} from '../domain/request';
import { db } from '../lib/db/';
import { findByUID, findByID } from './firestore/item';
import { getFireStore } from './firebase';
import { getIdToken } from './auth';
import { post } from './fetch';

export async function getItems(uid: UID): Promise<SelectItem[]> {
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

export async function getItemByID(uid: UID, id: string): Promise<SelectItem> {
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
  uid: UID,
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

export async function updateItem(uid: UID, item: UpdateItem): Promise<boolean> {
  if (uid) {
    const idToken = (await getIdToken()) || '';
    const response = await post<UpdateItemRequest, UpdateItemResponse>(
      'UpdateItem',
      {
        item,
      },
      idToken
    );
    if (response.error) {
      return false;
    }

    return true;
  } else {
    return new Promise(function(resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        update(tx, { ...item, id: Number(item.id) }, (_, err) => {
          if (err) {
            reject(false);
            return;
          }

          resolve(true);
          return;
        });
      });
    });
  }
}

export async function deleteItem(uid: UID, item: DeleteItem): Promise<boolean> {
  if (uid) {
    const idToken = (await getIdToken()) || '';
    const response = await post<DeleteItemRequest, DeleteItemResponse>(
      'DeleteItem',
      {
        item,
      },
      idToken
    );
    if (response.error) {
      return false;
    }

    return true;
  } else {
    return new Promise(function(resolve, reject) {
      try {
        db.transaction((tx: SQLite.SQLTransaction) => {
          Promise.all([
            deleteDBItem(tx, String(item.id)),
            deleteItemDBDetail(tx, String(item.id)),
            deleteCalendarDBDetail(tx, String(item.id)),
          ]).then(function(_) {
            resolve(true);
          });
        });
      } catch (_) {
        reject(false);
      }
    });
  }
}

const deleteDBItem = (tx: SQLite.SQLTransaction, id: string) => {
  return new Promise(function(resolve, reject) {
    delete1st(tx, id, (_, err) => {
      if (err) {
        reject(false);
        return;
      }

      resolve(true);
      return;
    });
  });
};

const deleteItemDBDetail = (tx: SQLite.SQLTransaction, id: string) => {
  return new Promise(function(resolve, reject) {
    deleteItenDetailByItemId(tx, id, (_, err) => {
      if (err) {
        reject(false);
        return;
      }

      resolve(true);
      return;
    });
  });
};

const deleteCalendarDBDetail = (tx: SQLite.SQLTransaction, id: string) => {
  return new Promise(function(resolve, reject) {
    deleteCalendarByItemId(tx, id, (_, err) => {
      if (err) {
        reject(false);
        return;
      }

      resolve(true);
      return;
    });
  });
};
