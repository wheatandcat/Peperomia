export type ItemDetail = {
  title: string;
  kind: string;
  memo: string;
  place: string;
  url: string;
  priority: number;
};

export type SelectItemDetail = ItemDetail & {
  id?: string | number;
  itemId: string | number;
};

export type UpdateItemDetail = ItemDetail & {
  id: string | number;
  itemId: string | number;
};

export type DeleteItemDetail = {
  id: string | number;
};
