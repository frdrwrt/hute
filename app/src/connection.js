import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client/core';
import { setClient } from 'svelte-apollo';
import fetch from 'cross-fetch';

export const startApolloConnection = () => {
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: new HttpLink({ uri: process.env.SERVER_API, fetch }),
  });
  setClient(client);
};
