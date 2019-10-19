import * as firebase from "firebase";
import "firebase/firestore";
import dayjs from "dayjs";
import advancedFormat from "dayjs/plugin/advancedFormat";
import "dayjs/locale/ja";
import { Calendar } from "../db/calendar";

dayjs.extend(advancedFormat);

export const findByUID = async (
  db: firebase.firestore.Firestore,
  uid: string
): Promise<Calendar[]> => {
  const qs = await db
    .collection("calendars")
    .where("uid", "==", uid)
    .get();

  const records: any = qs.docs.map(elem => {
    return elem.data();
  });

  console.log(records);

  return records.map((record: any) => ({
    ...record,
    date: dayjs(record.date.seconds * 1000).format("YYYY-MM-DD")
  }));
};
