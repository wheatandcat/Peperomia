import React, { createContext, Component, useContext, FC } from 'react';
import Client, { Request, Response } from '@specter/client';
import {
  Context as AuthContext,
  ContextProps as AuthContextProps,
} from './Auth';

const client = new Client({
  // Specter Endpoint
  base: process.env.API_HOST,
  // fetch options
  fetchOption: {},
});

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
  post = async <TRequest, TResponse>(
    url: string,
    body: TRequest
  ): Promise<Response<{ status: string }, TResponse>> => {
    const idToken = this.props.getIdToken ? await this.props.getIdToken() : '';

    const request = new Request<{}, {}, TRequest>(url, {
      headers: {
        authorization: `Bearer ${idToken}`,
      },
      query: {},
      body,
    });

    const data = await client.create<Response<{ status: string }, TResponse>>(
      request
    );

    if (Number(data.header.status) >= 400 && Number(data.header.status) < 600) {
      data.setError(`http status code: ${data.header.status}`);
    }

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

export const Consumer = Context.Consumer;
