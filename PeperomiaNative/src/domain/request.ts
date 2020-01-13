import { Item } from './item';
import { ItemDetail } from './itemDetail';
import { Calendar } from './calendar';

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

export type CreateCalendarRequest = {
  calendar: Calendar & {
    itemId: string;
  };
};

export type CreateCalendarResponse = Calendar & {
  id: string;
  itemId: string;
};
