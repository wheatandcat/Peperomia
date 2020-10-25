import { setContext } from '@apollo/client/link/context';
import { onError } from '@apollo/client/link/error';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import libAuth from 'lib/auth';

const auth = new libAuth();

const makeApolloClient = async () => {
  const uri = `${process.env.API_HOST}/app/graphql`;
  const authLink = setContext(async (_, { headers }) => {
    const token = await auth.getIdToken();
    console.log(`Bearer ${token}`);

    return {
      headers: {
        ...headers,
        Authorization: `Bearer ${token}`,
      },
    };
  });

  const errorLink = onError((error) => {
    console.log(error);
  });

  return new ApolloClient({
    link: errorLink.concat(authLink.concat(createHttpLink({ uri }))),
    cache: new InMemoryCache(),
  });
};

export default makeApolloClient;
