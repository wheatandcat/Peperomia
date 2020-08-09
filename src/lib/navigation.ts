import theme from 'config/theme';

import { SelectItemDetail } from 'domain/itemDetail';

export const navigationOption = (title: string) => ({
  title,
  headerStyle: {
    backgroundColor: theme().mode.header.backgroundColor,
  },
});

export type RootStackParamList = {
  Main: undefined;
  Home: { refresh: boolean; onPushCreatePlan?: () => Promise<void> };
  CreatePlan: {
    date?: string;
    kind?: string;
  };
  AddScheduleDetail: {
    itemId?: string | number;
    kind?: string;
    priority?: number;
    onSave?: () => void;
  };
  Setting: undefined;
  Tos: undefined;
  Policy: undefined;
  ScreenSetting: undefined;
  Schedule: {
    itemId: string | number;
    title?: string;
    itemDetails?: SelectItemDetail[];
    mode?: string;
    refresh?: string;
    onShow?: () => void;
    onSave?: () => void;
    onShare?: (title?: string, itemDetails?: SelectItemDetail[]) => void;
    onOpenActionSheet?: (
      title?: string,
      itemDetails?: SelectItemDetail[]
    ) => void;
    onEditPlan?: () => void;
  };
  Calendars: undefined;
  EditPlan: { id?: string | number; title?: string; kind?: string };
  ScheduleDetail: {
    itemDetailId: string | number;
    priority?: number;
    refreshData?: () => void;
    kind?: string;
  };
  Icons: {
    kind?: string;
    onSelectIcon?: (kind: string) => void;
    onDismiss?: () => void;
    photo?: boolean;
    defaultIcon?: boolean;
  };
  CreateSchedule: {
    itemId: number | string;
    title?: string;
    itemDetails?: SelectItemDetail[];
    refresh?: string;
  };
  CreateScheduleDetail: {
    itemId?: number | string;
    kind?: string;
  };
  Feedback: undefined;
  SignIn: {
    onLogin?: () => void;
  };
  MyPage: undefined;
  LoginWithAmazon: undefined;
};
