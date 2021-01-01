import EStyleSheet from 'react-native-extended-stylesheet';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Appearance, ColorSchemeName } from 'react-native-appearance';

// inspired by https://styled-system.com/getting-started#space-theming
const SPACE = [2, 4, 8, 16, 32, 64, 128, 256, 512] as const;

type ColorPalette1 = {
  pale: string;
  light: string;
  main: string;
  dark: string;
};

type ColorPalette2 = {
  light: string;
  main: string;
  dark: string;
};

type ThemeColor = {
  color: {
    primary: ColorPalette1;
    secondary: ColorPalette1;
    base: ColorPalette1;
    accent1: ColorPalette1;
    accent2: ColorPalette1;
    error: ColorPalette1;
    background: ColorPalette2;
  };
  mode: {
    background: string;
    secondaryBackground: string;
    icon: string;
    text: string;
    secondaryText: string;
    tabBar: {
      background: string;
      activeTint: string;
      inactiveTint: string;
    };
    header: {
      backgroundColor: string;
      text: string;
    };
    loading: {
      primaryColor: string;
      secondaryColor: string;
    };
  };
};

type Theme = {
  light: ThemeColor;
  dark: ThemeColor;
  'no-preference': ThemeColor;
};

const baseColor = {
  primary: {
    pale: '#D5EEE2',
    light: '#5DC894',
    main: '#006835',
    dark: '#003119',
  },
  secondary: {
    pale: '#F4FFBE',
    light: '#E6F599',
    main: '#ADCF01',
    dark: '#7F9705',
  },
  base: {
    pale: '#DBDBDB',
    light: '#9D9D9D',
    main: '#4F4F4F',
    dark: '#110f0f',
  },
  accent1: {
    pale: '#E5F0FF',
    light: '#A8C9F5',
    main: '#2F80ED',
    dark: '#034092',
  },
  accent2: {
    pale: '#FFFAEA',
    light: '#FFEDB5',
    main: '#F2C94C',
    dark: '#BE9109',
  },
  error: {
    pale: '#FFEBEB',
    light: '#FFABAB',
    main: '#E15757',
    dark: '#A81A1A',
  },
  background: {
    light: '#FAFAFA',
    main: '#ffffff',
    dark: '#000000',
  },
};

const darkColor = {
  ...baseColor,
};

const theme: Theme = {
  light: {
    color: baseColor,
    mode: {
      background: baseColor.background.light,
      secondaryBackground: baseColor.base.pale,
      icon: baseColor.base.dark,
      text: baseColor.base.dark,
      secondaryText: baseColor.base.main,
      tabBar: {
        background: baseColor.background.light,
        activeTint: baseColor.primary.main,
        inactiveTint: baseColor.base.main,
      },
      header: {
        backgroundColor: baseColor.primary.main,
        text: baseColor.secondary.main,
      },
      loading: {
        primaryColor: '#ccc',
        secondaryColor: '#bbb',
      },
    },
  },
  dark: {
    color: darkColor,
    mode: {
      background: baseColor.background.dark,
      secondaryBackground: baseColor.base.main,
      icon: baseColor.base.pale,
      text: baseColor.base.pale,
      secondaryText: baseColor.base.light,
      tabBar: {
        background: baseColor.background.dark,
        activeTint: baseColor.background.light,
        inactiveTint: baseColor.base.light,
      },
      header: {
        backgroundColor: baseColor.background.dark,
        text: baseColor.background.light,
      },
      loading: {
        primaryColor: '#555',
        secondaryColor: '#666',
      },
    },
  },
  'no-preference': {
    color: baseColor,
    mode: {
      background: baseColor.background.light,
      secondaryBackground: baseColor.base.pale,
      icon: baseColor.base.dark,
      text: baseColor.base.dark,
      secondaryText: baseColor.base.main,
      tabBar: {
        background: baseColor.background.light,
        activeTint: baseColor.primary.main,
        inactiveTint: baseColor.base.main,
      },
      header: {
        backgroundColor: baseColor.primary.main,
        text: baseColor.secondary.main,
      },
      loading: {
        primaryColor: '#ccc',
        secondaryColor: '#bbb',
      },
    },
  },
};

let mode: ColorSchemeName = Appearance.getColorScheme() || 'light';

export const setMode = (modeType: ColorSchemeName) => {
  mode = modeType;

  const themeMode = theme[mode].mode;

  EStyleSheet.build({
    $theme: modeType,
    $text: themeMode.text,
    $secondaryText: themeMode.secondaryText,
    $background: themeMode.background,
    $secondaryBackground: themeMode.secondaryBackground,
    $icon: themeMode.icon,
    $headerText: themeMode.header.text,
    $searchInputContainer: darkMode()
      ? baseColor.base.main
      : baseColor.background.light,
    $settingRoot: darkMode()
      ? baseColor.background.dark
      : baseColor.background.light,
    $settingMenu: darkMode() ? baseColor.base.dark : baseColor.background.main,
    $chip: darkMode() ? baseColor.base.dark : baseColor.background.light,
    $chipText: darkMode() ? baseColor.base.pale : baseColor.base.light,
    $button: darkMode() ? baseColor.base.dark : baseColor.primary.main,
    $secondaryButton: darkMode()
      ? baseColor.background.main
      : baseColor.primary.main,
    $buttonBorder: darkMode()
      ? baseColor.background.main
      : baseColor.primary.main,
    $tabTitleActiveColor: darkMode()
      ? baseColor.background.main
      : baseColor.primary.main,
    $tabTitleColor: darkMode() ? baseColor.base.pale : baseColor.base.main,
  });
};

export const darkMode = () => {
  return mode === 'dark';
};

const getTheme = () => {
  return {
    ...theme[mode],
    space: (index: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8) => SPACE[index],
  };
};

export default getTheme;

export const NavigationDefaultTheme = () => ({
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: baseColor.secondary.main,
    text: baseColor.secondary.main,
    background: baseColor.background.main,
    card: baseColor.background.main,
    border: baseColor.base.light,
  },
});

export const NavigationDarkTheme = () => ({
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: baseColor.base.pale,
    text: baseColor.background.main,
    background: baseColor.background.dark,
    card: baseColor.background.dark,
    border: baseColor.background.light,
  },
});
