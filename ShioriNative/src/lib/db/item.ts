import { SQLite } from "expo";

export interface Item {
  id?: number;
  title: string;
  image: string;
}

export const create = async (tx: SQLite.Transaction) => {
  return tx.executeSql(
    "create table if not exists items (id integer primary key not null, title string,image string);"
  );
};

export const insert = async (tx: SQLite.Transaction, item: Item) => {
  return tx.executeSql("insert into items (title, image) values (?, ?)", [
    item.title,
    item.image
  ]);
};

export const select = (tx: SQLite.Transaction) => {
  tx.executeSql(`select * from items;`, [], props => {
    console.log("-------");
    console.log(props);
  });
};
