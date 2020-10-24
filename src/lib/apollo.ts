import { HttpLink } from 'apollo-link-http';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import libAuth from 'lib/auth';

const makeApolloClient = async () => {
  const auth = new libAuth();
  const idToken = await auth.getIdToken();

  const link = new HttpLink({
    uri: `${process.env.API_HOST}/app/graphql`,
    headers: {
      Authorization: `Bearer ${idToken}`,
    },
  });

  const cache = new InMemoryCache();
  const client = new ApolloClient({
    link,
    cache,
  });
  return client;
};

export default makeApolloClient;
