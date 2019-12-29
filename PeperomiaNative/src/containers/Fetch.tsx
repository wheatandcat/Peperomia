import React, { createContext, Component, useContext, FC } from 'react';
import Constants from 'expo-constants';
import {
  Context as AuthContext,
  ContextProps as AuthContextProps,
} from './Auth';

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

export type ContextProps = Partial<Pick<Connected, 'post'>>;

type Props = {};

const Fetch: FC<Props> = props => {
  const { getIdToken } = useContext(AuthContext);

  return <Connected getIdToken={getIdToken}>{props.children}</Connected>;
};

export default Fetch;

type ConnectedProps = Pick<AuthContextProps, 'getIdToken'>;

class Connected extends Component<ConnectedProps> {
  post = async (url: string, param: any): Promise<Response> => {
    const idToken = this.props.getIdToken ? await this.props.getIdToken() : '';
    const apiHost = process.env.API_HOST;
    const init = {
      ...param,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${idToken}`,
      },
    };

    if (!Constants.isDevice) {
      console.info(init);
    }

    console.info(`Bearer ${idToken}`);

    const response = await fetch(`${apiHost}/${url}`, init);

    if (!Constants.isDevice) {
      const result = await response.json();
      console.info(result);
    }

    return response;
  };

  render() {
    return (
      <Provider
        value={{
          post: this.post,
        }}
      >
        {this.props.children}
      </Provider>
    );
  }
}

export const Consumer = Context.Consumer;
