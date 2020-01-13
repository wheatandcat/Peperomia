export type Item = {
  title: string;
  kind: string;
};

export type UpdateItem = Item & {
  id: string | number;
};
