import React, {
  createContext,
  useState,
  useCallback,
  FC,
  useContext,
  useEffect,
} from 'react';
import { StatusBar, StyleSheet } from 'react-native';
import {
  useColorScheme,
  ColorSchemeName,
  Appearance,
} from 'react-native-appearance';
import { ThemeProvider } from 'react-native-elements';
import { setMode } from 'config/theme';
import EStyleSheet from 'react-native-extended-stylesheet';
import theme from 'config/theme';

const styles = StyleSheet.create({
  buttonStyle: {
    borderRadius: 25,
    borderColor: theme().color.secondary.main,
  },
  buttonTitleStyle: {
    color: theme().color.base.pale,
    fontWeight: '600',
  },
  dividerStyle: {
    backgroundColor: theme().color.base.light,
  },
});

const estyles = EStyleSheet.create({
  text: {
    color: '$text',
  },
  listItem: {
    backgroundColor: '$settingMenu',
  },
});

const RNETheme = {
  Button: {
    raised: true,
    buttonStyle: styles.buttonStyle,
    titleStyle: styles.buttonTitleStyle,
  },
  ListItem: {
    containerStyle: estyles.listItem,
  },
  ListItemTitle: {
    style: estyles.text,
  },
  Divider: {
    style: styles.dividerStyle,
  },
  colors: {
    primary: theme().color.primary.main,
  },
};

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

type Props = {};

type State = {
  rendering: boolean;
  render: boolean;
};

export type ContextProps = Partial<
  Pick<State, 'rendering'> & {
    mode: string;
    colorScheme: string;
    onModeChange: (mode: 'light' | 'dark') => void;
    onFinishRendering: () => void;
  }
>;

const Theme: FC<Props> = (props) => {
  const scheme = useColorScheme();
  const [state, setState] = useState<State>({
    rendering: false,
    render: false,
  });

  const setUnRender = useCallback(() => {
    setState((s) => ({
      ...s,
      rendering: true,
      render: false,
    }));
  }, []);

  const setRender = useCallback(() => {
    setState((s) => ({
      ...s,
      rendering: true,
      render: true,
    }));
  }, []);

  const onModeChange = useCallback(
    async (mode: ColorSchemeName) => {
      setState((s) => ({
        ...s,
        rendering: true,
      }));

      if (mode === 'light' || mode === 'dark') {
        setMode(mode);
        setTimeout(setUnRender, 100);
        setTimeout(setRender, 101);
      }
    },
    [setRender, setUnRender]
  );

  const onFinishRendering = useCallback(() => {
    setState((s) => ({
      ...s,
      rendering: false,
    }));
  }, []);

  useEffect(() => {
    const checkMode = async () => {
      setState((s) => ({
        ...s,
        rendering: s.rendering,
        render: true,
      }));

      setMode(scheme);
    };

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      onModeChange(colorScheme);
    });

    checkMode();

    return () => subscription.remove();
  }, [scheme, onModeChange]);

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />

      {state.render && (
        <ThemeProvider theme={RNETheme} useDark={scheme === 'dark'}>
          <Provider
            value={{
              colorScheme: scheme,
              rendering: state.rendering,
              mode: scheme,
              onModeChange: onModeChange,
              onFinishRendering: onFinishRendering,
            }}
          >
            {props.children}
          </Provider>
        </ThemeProvider>
      )}
    </>
  );
};

export const Consumer = Context.Consumer;
export const useTheme = () => useContext(Context);
export default Theme;
