import { Item } from './item';

export type CreateItemRequest = {
  item: Item;
};

export type CreateItemResponse = Item & {
  id: string;
};
