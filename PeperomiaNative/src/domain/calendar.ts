export type Calendar = {
  date: string;
};

export type UpdateCalendar = Calendar & {
  id: string | number;
  itemId: string | number;
};
