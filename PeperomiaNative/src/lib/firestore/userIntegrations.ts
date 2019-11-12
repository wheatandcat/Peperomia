import * as firebase from "firebase";
import "firebase/firestore";

export const existsByUID = async (
  db: firebase.firestore.Firestore,
  uid: string
): Promise<boolean> => {
  const qs = await db
    .collection("userIntegrations")
    .where("uid", "==", uid)
    .limit(1)
    .get();

  return qs.docs.length > 0;
};
