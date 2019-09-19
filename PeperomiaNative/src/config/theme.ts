import EStyleSheet from "react-native-extended-stylesheet";

type ThemeColor = {
  color: {
    beige: string;
    blue: string;
    darkGray: string;
    didgerBlue: string;
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
  };
};

type Theme = {
  light: ThemeColor;
  dark: ThemeColor;
};

const baseColor = {
  beige: "#E4E4C8",
  blue: "#007bbb",
  darkGray: "#4F4F4F",
  didgerBlue: "#A1CBF3",
  gray: "#828282",
  lightBlue: "#A7EFFF",
  lightEmerald: "#98D181",
  lightGray: "#D3D3D3",
  highLightGray: "#F2F2F2",
  lightGreen: "#ADCF01",
  lightNavy: "#CECEE6",
  lightOrange: "#FFE3AC",
  lightPink: "#F1DBF9",
  lightRed: "#FF8C8C",
  lightYellow: "#FBFDB0",
  white: "#fff",
  pink: "#FCCBCB",
  main: "#006835",
  red: "#E15757",
  sky: "#00C2ED",
  yellow: "#f8e58c",
  black: "#333631"
};

const darkColor = {
  beige: "#E4E4C8",
  blue: "#007bbb",
  darkGray: "#4F4F4F",
  didgerBlue: "#A1CBF3",
  gray: "#828282",
  lightBlue: "#A7EFFF",
  lightEmerald: "#98D181",
  lightGray: "#D3D3D3",
  highLightGray: "#F2F2F2",
  lightGreen: "#ADCF01",
  lightNavy: "#CECEE6",
  lightOrange: "#FFE3AC",
  lightPink: "#F1DBF9",
  lightRed: "#FF8C8C",
  lightYellow: "#FBFDB0",
  white: "#fff",
  pink: "#FCCBCB",
  main: "#006835",
  red: "#E15757",
  sky: "#00C2ED",
  yellow: "#f8e58c",
  black: "#333631"
};

const theme: Theme = {
  light: {
    color: baseColor,
    mode: {
      background: baseColor.white,
      secondaryBackground: baseColor.lightGray,
      icon: baseColor.black,
      text: baseColor.black,
      secondaryText: baseColor.darkGray,
      tabBar: {
        background: baseColor.highLightGray,
        activeTint: baseColor.main,
        inactiveTint: baseColor.darkGray
      },
      header: {
        backgroundColor: baseColor.main,
        text: baseColor.lightGreen
      }
    }
  },
  dark: {
    color: darkColor,
    mode: {
      background: baseColor.black,
      secondaryBackground: baseColor.darkGray,
      icon: baseColor.lightGray,
      text: baseColor.lightGray,
      secondaryText: baseColor.gray,
      tabBar: {
        background: baseColor.darkGray,
        activeTint: baseColor.lightGreen,
        inactiveTint: baseColor.lightGray
      },
      header: {
        backgroundColor: baseColor.black,
        text: baseColor.highLightGray
      }
    }
  }
};

let mode: "light" | "dark" = "light";

export const setMode = (modeType: "light" | "dark") => {
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
    $settingRoot: darkMode() ? baseColor.black : baseColor.highLightGray,
    $settingMenu: darkMode() ? baseColor.darkGray : baseColor.white
  });
};

export const darkMode = () => {
  return mode === "dark";
};

const getTheme = () => {
  return theme[mode];
};

export default getTheme;
