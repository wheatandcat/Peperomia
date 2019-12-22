import { Item } from '../db/item';
import { ItemDetail } from '../db/itemDetail';
import { getFireStore } from '../firebase';

export const save = async (
  userID: string,
  item: Item,
  itemDetails: ItemDetail[]
) => {
  const uuid = userID + item.id;
  const db = getFireStore();

  try {
    const planDocRef = db.collection('plans').doc(uuid);
    const saveItem = {
      userID: userID,
      share: true,
      item: item,
      itemDetails: itemDetails,
      createDate: new Date(),
    };

    await planDocRef.set(saveItem);

    return uuid;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const updateShare = async (doc: string, share: boolean) => {
  const db = getFireStore();

  try {
    const planDocRef = db.collection('plans').doc(doc);

    await planDocRef.update({
      share,
      createDate: new Date(),
    });

    return true;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const isShare = async (doc: string): Promise<boolean> => {
  const db = getFireStore();

  const documentSnapshot = await db
    .collection('plans')
    .doc(doc)
    .get();

  const result: any = documentSnapshot.data();

  if (!result) {
    return false;
  }

  return result.share;
};
