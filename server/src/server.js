import Koa from 'koa';
import apollo from 'apollo-server-koa';
import config from 'config';
import schema from './schema/index.js';
import models from './models/index.js';

const { PubSub, ApolloServer } = apollo;

const koaServer = new Koa();

const pubsub = new PubSub();

export const apolloServer = new ApolloServer({
  schema,
  context: async () => ({ models, pubsub }),
});

const serverConnection = config.get('SERVER_CONNECTION');

export const startServer = async () => {
  await koaServer.use(apolloServer.getMiddleware());
  await koaServer.listen(serverConnection);
  console.log(
    `🚀 Server is running on http://${serverConnection.host}:${serverConnection.port}${apolloServer.graphqlPath}`,
  );
  return koaServer;
};

process.on('unhandledRejection', (err) => {
  console.error(err);
  process.exit(1);
});
