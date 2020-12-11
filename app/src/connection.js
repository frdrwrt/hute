import { ApolloClient, InMemoryCache, HttpLink, split, ApolloLink } from '@apollo/client/core';
import { setClient } from 'svelte-apollo';
import fetch from 'cross-fetch';
import { getMainDefinition } from '@apollo/client/utilities';
import { WebSocketLink } from '@apollo/client/link/ws';
import { onError } from '@apollo/client/link/error';
/**
 * Use http for graphql mutitations, queries, ..
 * Use websocket for graphql subscriptions
 * https://github.com/apollographql/subscriptions-transport-ws/issues/333#issuecomment-648722877
 */
export const startApolloConnection = () => {
  const ssrMode = typeof window === 'undefined';
  console.log('SSR MODE: ', ssrMode);

  const createHttpLink = () =>
    new HttpLink({
      uri: ssrMode ? process.env.SSR_SERVER_API : process.env.SERVER_API,
      fetch,
    });

  const createWsLink = () =>
    new WebSocketLink({
      uri: ssrMode ? process.env.SSR_SERVER_API_WS : process.env.SERVER_API_WS,
      options: {
        reconnect: true,
      },
    });

  const errorLink = onError(({ networkError, graphQLErrors }) => {
    if (graphQLErrors) {
      graphQLErrors.map((err) => {
        console.warn(err.message);
      });
    }
    if (networkError) {
      console.warn(networkError);
    }
  });

  const httpLink = ApolloLink.from([errorLink, createHttpLink()]);

  const createSplitLink = () =>
    split(
      ({ query }) => {
        const definition = getMainDefinition(query);
        return definition.kind === 'OperationDefinition' && definition.operation === 'subscription';
      },
      createWsLink(),
      httpLink,
    );

  // const link = ssrMode ? httpLink : process.env.browser ? createSplitLink() : httpLink;
  const link = ssrMode ? httpLink : createSplitLink();

  const client = new ApolloClient({
    ssrMode,
    cache: new InMemoryCache(),
    link,
  });
  setClient(client);
};
