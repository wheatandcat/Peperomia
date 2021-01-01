import EStyleSheet from 'react-native-extended-stylesheet';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';
import { Appearance, ColorSchemeName } from 'react-native-appearance';

// inspired by https://styled-system.com/getting-started#space-theming
const SPACE = [2, 4, 8, 16, 32, 64, 128, 256, 512] as const;

type ColorPalette = {
  pale: string;
  light: string;
  main: string;
  dark: string;
};

type ThemeColor = {
  color: {
    primary: ColorPalette;
    secondary: ColorPalette;
    base: ColorPalette;
    accent1: ColorPalette;
    accent2: ColorPalette;
    error: ColorPalette;
    background: ColorPalette;

    beige: string;
    blue: string;
    darkGray: string;
    dodgerBlue: string;
    gray: string;
    lightBlue: string;
    lightEmerald: string;
    lightGray: string;
    highLightGray: string;
    lightGreen: string;
    lightNavy: string;
    lightOrange: string;
    lightPink: string;
    lightRed: string;
    lightYellow: string;
    white: string;
    pink: string;
    main: string;
    red: string;
    sky: string;
    yellow: string;
    black: string;
    pitchBlack: string;
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

  beige: '#E4E4C8',
  blue: '#007bbb',
  darkGray: '#4F4F4F',
  dodgerBlue: '#A1CBF3',
  gray: '#828282',
  lightBlue: '#A7EFFF',
  lightEmerald: '#98D181',
  lightGray: '#D3D3D3',
  highLightGray: '#F2F2F2',
  lightGreen: '#ADCF01',
  lightNavy: '#CECEE6',
  lightOrange: '#FFE3AC',
  lightPink: '#F1DBF9',
  lightRed: '#FF8C8C',
  lightYellow: '#FBFDB0',
  white: '#fff',
  pink: '#FCCBCB',
  main: '#006835',
  red: '#E15757',
  sky: '#00C2ED',
  yellow: '#f8e58c',
  black: '#333631',
  pitchBlack: '#000',
};

const darkColor = {
  beige: '#E4E4C8',
  blue: '#007bbb',
  darkGray: '#4F4F4F',
  dodgerBlue: '#A1CBF3',
  gray: '#828282',
  lightBlue: '#A7EFFF',
  lightEmerald: '#98D181',
  lightGray: '#D3D3D3',
  highLightGray: '#F2F2F2',
  lightGreen: '#ADCF01',
  lightNavy: '#CECEE6',
  lightOrange: '#FFE3AC',
  lightPink: '#F1DBF9',
  lightRed: '#FF8C8C',
  lightYellow: '#FBFDB0',
  white: '#fff',
  pink: '#FCCBCB',
  main: '#006835',
  red: '#E15757',
  sky: '#00C2ED',
  yellow: '#f8e58c',
  black: '#333631',
  pitchBlack: '#000',
};

const theme: Theme = {
  light: {
    color: baseColor,
    mode: {
      background: baseColor.highLightGray,
      secondaryBackground: baseColor.lightGray,
      icon: baseColor.black,
      text: baseColor.black,
      secondaryText: baseColor.darkGray,
      tabBar: {
        background: baseColor.highLightGray,
        activeTint: baseColor.main,
        inactiveTint: baseColor.darkGray,
      },
      header: {
        backgroundColor: baseColor.main,
        text: baseColor.lightGreen,
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
      background: baseColor.pitchBlack,
      secondaryBackground: baseColor.darkGray,
      icon: baseColor.lightGray,
      text: baseColor.lightGray,
      secondaryText: baseColor.gray,
      tabBar: {
        background: baseColor.pitchBlack,
        activeTint: baseColor.highLightGray,
        inactiveTint: baseColor.gray,
      },
      header: {
        backgroundColor: baseColor.pitchBlack,
        text: baseColor.highLightGray,
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
      background: baseColor.highLightGray,
      secondaryBackground: baseColor.lightGray,
      icon: baseColor.black,
      text: baseColor.black,
      secondaryText: baseColor.darkGray,
      tabBar: {
        background: baseColor.highLightGray,
        activeTint: baseColor.main,
        inactiveTint: baseColor.darkGray,
      },
      header: {
        backgroundColor: baseColor.main,
        text: baseColor.lightGreen,
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
      ? baseColor.darkGray
      : baseColor.highLightGray,
    $settingRoot: darkMode() ? baseColor.pitchBlack : baseColor.highLightGray,
    $settingMenu: darkMode() ? baseColor.black : baseColor.white,
    $chip: darkMode() ? baseColor.black : baseColor.highLightGray,
    $chipText: darkMode() ? baseColor.lightGray : baseColor.gray,
    $button: darkMode() ? baseColor.black : baseColor.main,
    $secondaryButton: darkMode() ? baseColor.white : baseColor.main,
    $buttonBorder: darkMode() ? baseColor.white : baseColor.main,
    $tabTitleActiveColor: darkMode() ? baseColor.white : baseColor.main,
    $tabTitleColor: darkMode() ? baseColor.lightGray : baseColor.darkGray,
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
    primary: baseColor.lightGreen,
    text: baseColor.lightGreen,
    background: baseColor.white,
    card: baseColor.white,
    border: baseColor.gray,
  },
});

export const NavigationDarkTheme = () => ({
  ...DarkTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: baseColor.lightGray,
    text: baseColor.white,
    background: baseColor.pitchBlack,
    card: baseColor.pitchBlack,
    border: baseColor.highLightGray,
  },
});
