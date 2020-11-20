import Koa from 'koa';
import apollo from 'apollo-server-koa';
import schema from './schema/index.js';
import models from './models/index.js';

const { PubSub, ApolloServer } = apollo;

const koaServer = new Koa();

const pubsub = new PubSub();

export const apolloServer = new ApolloServer({
  schema,
  context: async () => ({ models, pubsub }),
  introspection: true,
  playground: true,
});

export const startServer = async () => {
  await koaServer.use(apolloServer.getMiddleware());
  await koaServer.listen({
    port: process.env.SERVER_PORT,
  });
  console.log(`🚀 Server is running on http://localhost:${process.env.SERVER_PORT}${apolloServer.graphqlPath}`);
  return koaServer;
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});
