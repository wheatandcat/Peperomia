import React, {
  createContext,
  useState,
  useCallback,
  FC,
  useContext,
  useEffect,
} from 'react';
import { StatusBar } from 'react-native';
import {
  useColorScheme,
  ColorSchemeName,
  Appearance,
} from 'react-native-appearance';
import { setMode } from 'config/theme';

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

type Props = {};

type State = {
  rerendering: boolean;
  render: boolean;
};

export type ContextProps = Partial<
  Pick<State, 'rerendering'> & {
    mode: string;
    colorScheme: string;
    onModeChange: (mode: 'light' | 'dark') => void;
    onFinishRerendering: () => void;
  }
>;

const Theme: FC<Props> = (props) => {
  const scheme = useColorScheme();
  const [state, setState] = useState<State>({
    rerendering: false,
    render: false,
  });

  const setUnRender = useCallback(() => {
    setState((s) => ({
      ...s,
      rerendering: true,
      render: false,
    }));
  }, []);

  const setRender = useCallback(() => {
    setState((s) => ({
      ...s,
      rerendering: true,
      render: true,
    }));
  }, []);

  const onModeChange = useCallback(
    async (mode: ColorSchemeName) => {
      setState((s) => ({
        ...s,
        rerendering: true,
      }));

      if (mode === 'light' || mode === 'dark') {
        setMode(mode);
        setTimeout(setUnRender, 100);
        setTimeout(setRender, 101);
      }
    },
    [setRender, setUnRender]
  );

  const onFinishRerendering = useCallback(() => {
    setState((s) => ({
      ...s,
      rerendering: false,
    }));
  }, []);

  useEffect(() => {
    const checkMode = async () => {
      setState((s) => ({
        ...s,
        rerendering: s.rerendering,
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
        <Provider
          value={{
            colorScheme: scheme,
            rerendering: state.rerendering,
            mode: scheme,
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
export const useTheme = () => useContext(Context);
export default Theme;
