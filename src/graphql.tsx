import { ApolloClient } from 'apollo-client';
import { ENV } from './env';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
  uri: ENV.REACT_APP_API_URL
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  // const token = AuthSession.current().accessToken;
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers
      // authorization: token ? `Bearer ${token}` : ''
    }
  };
});

export const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});
