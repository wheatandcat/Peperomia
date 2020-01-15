import { Item, UpdateItem, DeleteItem } from './item';
import { ItemDetail, UpdateItemDetail, DeleteItemDetail } from './itemDetail';
import { Calendar, UpdateCalendar } from './calendar';

export type CreateItemRequest = {
  item: Item;
};

export type CreateItemResponse = Item & {
  id: string;
};

export type UpdateItemRequest = {
  item: UpdateItem;
};

export type UpdateItemResponse = null;

export type DeleteItemRequest = {
  item: DeleteItem;
};

export type DeleteItemResponse = null;

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

export type UpdateItemDetailResponse = null;

export type DeleteItemDetailRequest = {
  itemDetail: DeleteItemDetail;
};

export type DeleteItemDetailResponse = null;

export type CreateCalendarRequest = {
  calendar: Calendar & {
    itemId: string;
  };
};

export type CreateCalendarResponse = Calendar & {
  id: string;
  itemId: string;
};

export type UpdateCalendarlRequest = {
  calendar: UpdateCalendar;
};

export type UpdateCalendarResponse = null;
