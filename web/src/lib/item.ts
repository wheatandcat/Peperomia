export interface Item {
  id: number;
  title: string;
  kind: string;
  image: string;
}

export interface ItemDetail {
  id: number;
  itemId: number;
  title: string;
  kind: string;
  memo: string;
  moveMinutes: number | null;
  priority: number;
}
