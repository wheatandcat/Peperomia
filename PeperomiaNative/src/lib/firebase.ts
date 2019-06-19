import * as firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "../config/firebase";

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

export const getFireStore = () => {
  return db;
};
