import {ApolloClient} from 'apollo-client';
import {HttpLink} from 'apollo-link-http';
import {InMemoryCache} from 'apollo-cache-inmemory';

// TODO: Replace with server uri
const SERVER_URL = 'http://129.213.158.42:9003/graphql';

const httpLink = new HttpLink({
  uri: SERVER_URL,
});

const cache = new InMemoryCache();

const client = new ApolloClient({
  link: httpLink,
  cache,
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'ignore',
    },
    query: {
      fetchPolicy: 'no-cache',
      errorPolicy: 'all',
    },
  },
});

export const getClient = () => client;
