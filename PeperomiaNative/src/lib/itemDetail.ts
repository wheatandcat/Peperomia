import * as SQLite from 'expo-sqlite';
import {
  selectByItemId,
  select1st,
  insert,
  update,
  delete1st,
  countByItemId,
} from './db/itemDetail';
import { UID } from '../domain/user';
import {
  CreateItemDetailRequest,
  CreateItemDetailResponse,
  UpdateItemDetailRequest,
  UpdateItemDetailResponse,
  DeleteItemDetailRequest,
  DeleteItemDetailResponse,
} from '../domain/request';
import {
  ItemDetail,
  UpdateItemDetail,
  DeleteItemDetail,
  SelectItemDetail,
} from '../domain/itemDetail';
import { db } from '../lib/db/';
import { findByItemID, findByID, countByItemID } from './firestore/itemDetail';
import { getFireStore } from './firebase';
import { getIdToken } from './auth';
import { post } from './fetch';

export async function getItemDetails(
  uid: UID,
  itemID: string
): Promise<SelectItemDetail[]> {
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

export async function countItemDetail(
  uid: UID,
  itemID: string
): Promise<number> {
  if (uid) {
    const firestore = getFireStore();
    const count = await countByItemID(firestore, uid, itemID);
    return count;
  } else {
    return new Promise(function(resolve, reject) {
      db.transaction((tx: SQLite.SQLTransaction) => {
        countByItemId(tx, itemID, (count, err) => {
          if (err) {
            reject(count);
            return;
          }

          resolve(0);
          return;
        });
      });
    });
  }
}

export async function sortItemDetail(
  uid: UID,
  itemDetails: UpdateItemDetail[]
): Promise<boolean> {
  for (let i = 0; i < itemDetails.length; i++) {
    itemDetails[i].priority = i + 1;
    const resut = await updateItemDetail(uid, itemDetails[i]);
    if (!resut) {
      return false;
    }
  }

  return true;
}

export async function getItemDetailByID(
  uid: UID,
  id: string
): Promise<SelectItemDetail> {
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
  uid: UID,
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

export async function updateItemDetail(
  uid: UID,
  itemDetail: UpdateItemDetail
): Promise<boolean> {
  if (uid) {
    const idToken = (await getIdToken()) || '';
    const response = await post<
      UpdateItemDetailRequest,
      UpdateItemDetailResponse
    >(
      '/UpdateItemDetail',
      {
        itemDetail,
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
        const v = {
          ...itemDetail,
          id: Number(itemDetail.id),
          itemId: Number(itemDetail.itemId),
        };

        update(tx, v, (_, err) => {
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

export async function deleteItemDetail(
  uid: UID,
  itemDetail: DeleteItemDetail
): Promise<boolean> {
  if (uid) {
    const idToken = (await getIdToken()) || '';
    const response = await post<
      DeleteItemDetailRequest,
      DeleteItemDetailResponse
    >(
      'DeleteItemDetail',
      {
        itemDetail,
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
        delete1st(tx, String(itemDetail.id), (_, err) => {
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
