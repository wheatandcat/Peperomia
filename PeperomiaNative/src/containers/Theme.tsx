import React, { createContext, Component, ReactNode } from "react";
import { AsyncStorage } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { Appearance, useColorScheme } from "react-native-appearance";
import { setMode } from "../config/theme";

const Context = createContext({});
const { Provider } = Context;

type Props = {
  children: ReactNode;
};

type ThemeProps = {
  children: ReactNode;
  colorScheme: string;
};

type State = {
  rerendering: boolean;
  mode: string;
  render: boolean;
};

export type ContextProps = Partial<
  Pick<State, "rerendering" | "mode"> & {
    onModeChange: (mode: "light" | "dark") => void;
    onFinishRerendering: () => void;
  }
>;

Appearance.getColorScheme();

export default (props: Props) => {
  console.log("--------------");
  const colorScheme = useColorScheme();
  console.log(colorScheme);

  return <Theme colorScheme={colorScheme}>{props.children}</Theme>;
};

class Theme extends Component<ThemeProps, State> {
  state = {
    rerendering: false,
    mode: "light",
    render: false
  };

  async componentDidMount() {
    let mode = await AsyncStorage.getItem("THEME_MODE");

    if (mode !== "dark") {
      if (
        this.props.colorScheme === "light" ||
        this.props.colorScheme === "dark"
      ) {
        // 初期値はデバイスのモードで設定
        mode = this.props.colorScheme;
      } else {
        mode = "light";
      }
    }

    if (mode === "light" || mode === "dark") {
      setMode(mode);
    }

    this.setState({
      mode,
      render: true
    });
  }

  onModeChange = async (mode: "light" | "dark") => {
    this.setState({
      mode,
      rerendering: true
    });

    await AsyncStorage.setItem("THEME_MODE", mode);

    if (mode === "light" || mode === "dark") {
      setMode(mode);
      setTimeout(this.setUnRender.bind(this), 100);
      setTimeout(this.setRender.bind(this), 101);
    }
  };

  setUnRender = () => {
    this.setState({
      render: false
    });
  };

  setRender = () => {
    this.setState({
      render: true
    });
  };

  onFinishRerendering = () => {
    this.setState({
      rerendering: false
    });
  };

  render() {
    return (
      <>
        <Spinner visible={this.state.rerendering} textContent="" />
        {this.state.render && (
          <Provider
            value={{
              rerendering: this.state.rerendering,
              mode: this.state.mode,
              onModeChange: this.onModeChange,
              onFinishRerendering: this.onFinishRerendering
            }}
          >
            {this.props.children}
          </Provider>
        )}
      </>
    );
  }
}

export const Consumer = Context.Consumer;
