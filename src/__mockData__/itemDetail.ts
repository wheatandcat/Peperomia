import { ItemDetail } from 'domain/itemDetail';

export const itemDetailMockData: ItemDetail = {
  title: 'test',
  kind: 'park',
  memo: 'memo',
  place: 'place',
  url: 'url',
  moveMinutes: 30,
  priority: 1,
};

export const itemDetailsMockData: ItemDetail[] = [
  {
    title: 'test1',
    kind: 'park1',
    memo: 'memo1',
    place: 'place1',
    url: 'url1',
    moveMinutes: 30,
    priority: 1,
  },
  {
    title: 'test2',
    kind: 'park2',
    memo: 'memo2',
    place: 'place2',
    url: 'url2',
    moveMinutes: 45,
    priority: 2,
  },
];
