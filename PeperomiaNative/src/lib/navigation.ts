import theme from 'config/theme';

export const navigationOption = (title: string) => ({
  title,
  headerTitleStyle: {
    color: theme().mode.header.text,
  },
  headerTintColor: theme().mode.header.text,
  headerStyle: {
    backgroundColor: theme().mode.header.backgroundColor,
  },
});

export type RootStackParamList = {
  Home: { refresh: boolean; onPushCreatePlan: () => Promise<void> };
  CreatePlan: {
    date?: string;
  };
  ScreenSetting: undefined;
  Schedule: { itemId: string | number; title: string };
  Calendars: undefined;
};
