import * as SQLite from 'expo-sqlite';
import dayjs from 'dayjs';
import 'dayjs/locale/ja';
import { create as createItem, insert as insertItem, Item } from './item';
import {
  create as createItemDetail,
  insert as insertItemDetail,
  ItemDetail,
} from './itemDetail';
import { create as createUser } from './user';
import {
  create as createCalendar,
  insert as insertCalendar,
  Calendar,
} from './calendar';
import {
  KIND_FISHING,
  KIND_PARK,
  KIND_ART_MUSEUM,
  KIND_DEFAULT,
  KIND_ZOO,
  KIND_COFFEE,
  KIND_SHOP,
  KIND_TRAIN,
  KIND_MOVIE,
  KIND_CHERRY_BLOSSOM,
  KIND_SHIP,
} from 'peperomia-util';
import { success, error, list } from './';

export const deleteSql = (tx: SQLite.SQLTransaction) => {
  tx.executeSql('drop table calendars');
  tx.executeSql('drop table items');
  tx.executeSql('drop table item_details');

  createItem(tx);
  createItemDetail(tx);
  createCalendar(tx);
};

export const deleteUserSql = (tx: SQLite.SQLTransaction) => {
  tx.executeSql('drop table users');

  createUser(tx);
};

export const resetSql = (tx: SQLite.SQLTransaction) => {
  deleteSql(tx);

  const items: Item[] = [
    { title: '葛西臨海公園', kind: KIND_PARK },
    {
      title: '市ヶ谷フィッシュセンター',
      kind: KIND_FISHING,
    },
    {
      title: 'TOHOシネマズ 新宿',
      kind: KIND_MOVIE,
    },
    {
      title: 'お花見',
      kind: KIND_CHERRY_BLOSSOM,
    },
    {
      title: '上野動物園',
      kind: KIND_ZOO,
    },
  ];

  const itemDetails: ItemDetail[] = [
    {
      itemId: 1,
      title: '葛西臨海公園',
      kind: KIND_PARK,
      url: 'https://www.tokyo-park.or.jp/park/format/index026.html',
      place: '駐車場に集合',
      memo: '■行く場所\n・砂浜\n・水族園',
      priority: 1,
    },
    {
      itemId: 1,
      title: '新宿駅',
      kind: KIND_TRAIN,
      url: '',
      place: '西口に10:00',
      memo: '',
      priority: 2,
    },
    {
      itemId: 1,
      title: '葛西臨海公園　水上バス',
      kind: KIND_SHIP,
      url: '',
      place: '',
      memo: '',
      priority: 3,
    },
    {
      itemId: 1,
      title: '浅草寺二天門前',
      kind: KIND_DEFAULT,
      url: '',
      place: '',
      memo: '',
      priority: 4,
    },
    {
      itemId: 2,
      title: '市ヶ谷フィッシュセンター',
      url: '',
      place: '',
      kind: KIND_FISHING,
      memo: '',
      priority: 1,
    },
    {
      itemId: 2,
      title: '市ヶ谷駅',
      kind: KIND_TRAIN,
      url: '',
      place: '',
      memo: '',
      priority: 2,
    },
    {
      itemId: 3,
      title: 'TOHOシネマズ 新宿',
      kind: KIND_MOVIE,
      url: '',
      place: '',
      memo: '',
      priority: 1,
    },
    {
      itemId: 3,
      title: '新宿駅',
      kind: KIND_TRAIN,
      url: '',
      place: '',
      memo: '',
      priority: 2,
    },
    {
      itemId: 3,
      title: '新宿御苑',
      kind: KIND_PARK,
      url: '',
      place: '',
      memo: '',
      priority: 3,
    },
    {
      itemId: 4,
      title: 'お花見',
      kind: KIND_CHERRY_BLOSSOM,
      url: '',
      place: '',
      memo: '',
      priority: 1,
    },
    {
      itemId: 4,
      title: '飯田橋駅',
      kind: KIND_TRAIN,
      url: '',
      place: '',
      memo: '',
      priority: 2,
    },
    {
      itemId: 4,
      title: 'カナルカフェ',
      kind: KIND_COFFEE,
      url: '',
      place: '',
      memo: '',
      priority: 3,
    },
    {
      itemId: 4,
      title: '買い物',
      kind: KIND_SHOP,
      url: '',
      place: '',
      memo: '',
      priority: 4,
    },
    {
      itemId: 5,
      title: '上野動物園',
      kind: KIND_ZOO,
      url: '',
      place: '',
      memo: '',
      priority: 1,
    },
    {
      itemId: 5,
      title: '上野駅',
      kind: KIND_TRAIN,
      url: '',
      place: '',
      memo: '',
      priority: 2,
    },
    {
      itemId: 5,
      title: '上野の森美術館',
      kind: KIND_ART_MUSEUM,
      url: '',
      place: '',
      memo: '',
      priority: 3,
    },
  ];

  const year = dayjs().year();
  const month = ('00' + String(dayjs().month() + 1)).slice(-2);

  const calendars: Calendar[] = [
    {
      itemId: 1,
      date: `${year}-${month}-01`,
    },
    {
      itemId: 2,
      date: `${year}-${month}-07`,
    },
    {
      itemId: 3,
      date: `${year}-${month}-18`,
    },
    {
      itemId: 4,
      date: `${year}-${month}-23`,
    },
    {
      itemId: 5,
      date: `${year}-${month}-27`,
    },
  ];

  items.map((item) => insertItem(tx, item));
  itemDetails.map((itemDetail) => insertItemDetail(tx, itemDetail));
  calendars.map((calendar) => insertCalendar(tx, calendar));
};

export const resetSqlV100 = (tx: SQLite.SQLTransaction) => {
  tx.executeSql('drop table items');
  tx.executeSql('drop table item_details');

  createItem(tx);
  createItemDetailV100(tx);
};

export const createItemDetailV100 = async (
  tx: SQLite.SQLTransaction,
  callback?: (data: any, error: SQLite.SQLError | null) => void
) => {
  return tx.executeSql(
    'create table if not exists item_details (' +
      'id integer primary key not null,' +
      'itemId integer,' +
      'title string,' +
      'kind string,' +
      'memo string,' +
      'priority integer' +
      ');',
    [],
    (_, props) => success(list(props.rows), callback),
    (_, err) => error(err, callback)
  );
};

export const sqliteMaster = async (tx: SQLite.SQLTransaction) => {
  return tx.executeSql(
    'select * from sqlite_master;',
    [],
    (_, props) => {
      console.log(list(props.rows));
    },
    (_, err) => {
      console.log(err);
      return false;
    }
  );
};
