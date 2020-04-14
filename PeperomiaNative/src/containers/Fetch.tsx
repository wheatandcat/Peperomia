import React, { createContext, Component, useContext, FC } from 'react';
import { Response } from '@specter/client';
import { post } from '../lib/fetch';
import {
  Context as AuthContext,
  ContextProps as AuthContextProps,
} from './Auth';

export const Context = createContext<ContextProps>({});
const { Provider } = Context;

export type ContextProps = Partial<Pick<Connected, 'post'>>;

type Props = {};

const Fetch: FC<Props> = (props) => {
  const { getIdToken } = useContext(AuthContext);

  return <Connected getIdToken={getIdToken}>{props.children}</Connected>;
};

export default Fetch;

type ConnectedProps = Pick<AuthContextProps, 'getIdToken'>;

class Connected extends Component<ConnectedProps> {
  post = async <TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Promise<Response<{ status: string }, TResponse>> => {
    const idToken = this.props.getIdToken ? await this.props.getIdToken() : '';
    const data = post<TRequest, TResponse>(url, body, idToken || '');

    return data;
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
export const useFetch = () => useContext(Context);
export const Consumer = Context.Consumer;
