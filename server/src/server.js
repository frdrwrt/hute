import http from 'http';
import express from 'express';
import apollo from 'apollo-server-express';
import schema from './schema/index.js';
import models from './models/index.js';

const { PubSub, ApolloServer } = apollo;

export const pubsub = new PubSub();

export const startServer = async () => {
  const expressServer = express();

  const apolloServer = new ApolloServer({
    path: '/api',
    schema,
    context: async () => ({ models, pubsub }),
    introspection: true,
    playground: {
      endpoint: 'http://localhost:4000/graphql',
      subscriptionEndpoint: '/subscriptions',
    },
    subscriptions: {
      path: '/subscriptions',
    },
  });

  apolloServer.applyMiddleware({ app: expressServer });

  const httpServer = http.createServer(expressServer);

  apolloServer.installSubscriptionHandlers(httpServer);

  const PORT = process.env.SERVER_PORT;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}${apolloServer.graphqlPath}`);
    console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${apolloServer.subscriptionsPath}`);
  });
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});
