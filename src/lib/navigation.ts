import theme from 'config/theme';

export const navigationOption = (title: string) => ({
  title,
  headerStyle: {
    backgroundColor: theme().mode.header.backgroundColor,
  },
});

export type RootStackParamList = {
  Main: undefined;
  AddItemDetail: {
    date: string;
    itemId: string;
    priority: number;
    onCallback: () => Promise<void>;
  };
  ItemDetail: { date: string; itemId: string; itemDetailId: string };
  Setting: undefined;
  Tos: undefined;
  Policy: undefined;
  Calendars: undefined;
  Calendar: { date: string; create?: boolean };
  EditItemDetail: {
    date: string;
    itemId: string;
    itemDetailId: string;
    onCallback: () => Promise<void>;
  };
  CreateCalendar: { date?: string };
  Icons: {
    kind?: string;
    onSelectIcon?: (kind: string) => void;
  };
  Feedback: undefined;
  SignIn: {
    onLogin?: () => void;
  };
  MyPage: undefined;
  LoginWithAmazon: undefined;
};
