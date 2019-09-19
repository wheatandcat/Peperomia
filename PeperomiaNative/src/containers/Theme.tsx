import React, { createContext, Component } from "react";
import { AsyncStorage } from "react-native";
import Spinner from "react-native-loading-spinner-overlay";
import { setMode } from "../config/theme";

const Context = createContext({});
const { Provider } = Context;

type Props = {};

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

export default class extends Component<Props, State> {
  state = {
    rerendering: false,
    mode: "light",
    render: false
  };

  async componentDidMount() {
    let mode = await AsyncStorage.getItem("THEME_MODE");
    console.log(mode);

    if (mode !== "dark") {
      mode = "light";
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
