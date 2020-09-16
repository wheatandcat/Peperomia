import firebase from '../system/firebase';

export const getSupportVersion = async (
  db: firebase.firestore.Firestore
): Promise<string> => {
  const qs = await db.collection('supportVersion').limit(1).get();

  const records = qs.docs.map((elem) => {
    return elem.data();
  });

  if (!records || !records[0]) {
    return '1.0.0';
  }

  return records[0]?.supportVersion || '1.0.0';
};
