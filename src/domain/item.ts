export type Item = {
  title: string;
  kind: string;
  public?: boolean;
};

export type SelectItem = Item & {
  id: string | number;
};

export type UpdateItem = Item & {
  id: string | number;
};

export type DeleteItem = {
  id: string | number;
};
