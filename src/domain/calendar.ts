import { Item } from './item';

export type Calendar = {
  date: string;
};

export type UpdateCalendar = Calendar & {
  id: string | number;
  itemId: string | number;
};

export type SelectCalendar = Calendar &
  Item & {
    id: string | number;
    itemId: string | number;
  };
