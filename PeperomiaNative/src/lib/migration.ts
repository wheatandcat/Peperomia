import * as SQLite from "expo-sqlite";
import * as Sentry from "sentry-expo";
import {
  migrationV1040 as v1040,
  migrationV1041 as v1041
} from "./db/migration";
import { db } from "./db";

export const migrationV104 = async (): Promise<Boolean> => {
  try {
    await db.transaction(async (tx: SQLite.Transaction) => {
      await v1040(tx);
      await v1041(tx);
    });

    return true;
  } catch (err) {
    Sentry.captureMessage(err);
    return false;
  }
};
