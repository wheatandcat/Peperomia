import React, { createContext, useState, useCallback, FC } from 'react';
import { AsyncStorage, StatusBar } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { Appearance, useColorScheme } from 'react-native-appearance';
import { useDidMount } from '../hooks/index';
import { setMode, darkMode } from '../config/theme';

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

type Props = {};

type State = {
  rerendering: boolean;
  mode: string;
  render: boolean;
};

export type ContextProps = Partial<
  Pick<State, 'rerendering' | 'mode'> & {
    colorScheme: string;
    onModeChange: (mode: 'light' | 'dark') => void;
    onFinishRerendering: () => void;
  }
>;

Appearance.getColorScheme();

const Theme: FC<Props> = props => {
  const colorScheme = useColorScheme();

  const [state, setState] = useState<State>({
    rerendering: false,
    mode: 'light',
    render: false,
  });

  useDidMount(() => {
    const checkMode = async () => {
      let mode = await AsyncStorage.getItem('THEME_MODE');

      if (mode !== 'dark') {
        if (colorScheme === 'light' || colorScheme === 'dark') {
          // 初期値はデバイスのモードで設定
          mode = colorScheme;
        } else {
          mode = 'light';
        }
      }

      if (mode === 'light' || mode === 'dark') {
        setMode(mode);
      }

      setState(s => ({
        rerendering: s.rerendering,
        mode: String(mode),
        render: true,
      }));
    };

    checkMode();
  });

  const setUnRender = useCallback(() => {
    setState({
      mode: darkMode() ? 'dark' : 'light',
      rerendering: true,
      render: false,
    });
  }, []);

  const setRender = useCallback(() => {
    setState({
      mode: darkMode() ? 'dark' : 'light',
      rerendering: true,
      render: true,
    });
  }, []);

  const onModeChange = useCallback(
    async (mode: 'light' | 'dark') => {
      setState(s => ({
        ...s,
        mode,
        rerendering: true,
      }));

      await AsyncStorage.setItem('THEME_MODE', mode);

      if (mode === 'light' || mode === 'dark') {
        setMode(mode);
        setTimeout(setUnRender, 100);
        setTimeout(setRender, 101);
      }
    },
    [setRender, setUnRender]
  );

  const onFinishRerendering = useCallback(() => {
    setState(s => ({
      ...s,
      rerendering: false,
    }));
  }, []);

  return (
    <>
      <StatusBar backgroundColor="#fff" barStyle="light-content" />
      <Spinner visible={state.rerendering} textContent="" />
      {state.render && (
        <Provider
          value={{
            colorScheme: colorScheme,
            rerendering: state.rerendering,
            mode: state.mode,
            onModeChange: onModeChange,
            onFinishRerendering: onFinishRerendering,
          }}
        >
          {props.children}
        </Provider>
      )}
    </>
  );
};

export const Consumer = Context.Consumer;
export default Theme;
