import http from 'http';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import { pubsub } from './db';
import schema from './schema';
import models from './models';

const PORT = process.env.SERVER_PORT;

const expressServer = express();
export const apolloServer = new ApolloServer({
  path: '/api',
  schema,
  context: async () => ({ models, pubsub }),
  introspection: true,
  playground: {
    endpoint: `http://localhost:${PORT}/graphql`,
    subscriptionEndpoint: '/subscriptions',
  },
  subscriptions: {
    path: '/subscriptions',
  },
});
export const startServer = async () => {
  apolloServer.applyMiddleware({ app: expressServer });

  const httpServer = http.createServer(expressServer);

  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
  });
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});
