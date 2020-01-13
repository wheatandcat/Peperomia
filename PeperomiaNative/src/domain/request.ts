import { Item, UpdateItem } from './item';
import { ItemDetail, UpdateItemDetail } from './itemDetail';
import { Calendar } from './calendar';

export type CreateItemRequest = {
  item: Item;
};

export type CreateItemResponse = Item & {
  id: string;
};

export type UpdateItemRequest = {
  item: UpdateItem;
};

export type UpdateItemResponse = UpdateItem;

export type CreateItemDetailRequest = {
  itemDetail: ItemDetail & {
    itemId: string;
  };
};

export type CreateItemDetailResponse = ItemDetail & {
  id: string;
  itemId: string;
};

export type UpdateItemDetailRequest = {
  itemDetail: UpdateItemDetail;
};

export type UpdateItemDetailResponse = UpdateItemDetail;

export type CreateCalendarRequest = {
  calendar: Calendar & {
    itemId: string;
  };
};

export type CreateCalendarResponse = Calendar & {
  id: string;
  itemId: string;
};
