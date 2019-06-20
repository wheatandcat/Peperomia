import React, { createContext, Component } from "react";
import Constants from "expo-constants";
import { Consumer as AuthConsumer } from "./Auth";

const Context = createContext({});
const { Provider } = Context;

interface Props {}

export default class extends Component<Props> {
  render() {
    return (
      <AuthConsumer>
        {({ getIdToken }: any) => (
          <Connected getIdToken={getIdToken}>{this.props.children}</Connected>
        )}
      </AuthConsumer>
    );
  }
}

interface ConnectedProps {
  getIdToken: () => void;
}

export interface FetchValue {
  post: (url: string, param: any) => Promise<Response>;
}

class Connected extends Component<ConnectedProps> {
  post = async (url: string, param: any): Promise<Response> => {
    const idToken = await this.props.getIdToken();
    const apiHost = process.env.API_HOST;
    const init = {
      ...param,
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`
      }
    };

    if (!Constants.isDevice) {
      console.info(init);
    }

    console.info(`Bearer ${idToken}`);

    const response = await fetch(`${apiHost}/${url}`, init);

    if (!Constants.isDevice) {
      if (!response.ok) {
        const result = await response.json();
        console.info(result);
      }
    }

    return response;
  };

  render() {
    return (
      <Provider
        value={{
          post: this.post
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export const Consumer = Context.Consumer;
