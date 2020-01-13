import { Item } from './item';
import { ItemDetail } from './itemDetail';

export type CreateItemRequest = {
  item: Item;
};

export type CreateItemResponse = Item & {
  id: string;
};

export type CreateItemDetailRequest = {
  itemDetail: ItemDetail & {
    itemId: string;
  };
};

export type CreateItemDetailResponse = ItemDetail & {
  id: string;
  itemId: string;
};
