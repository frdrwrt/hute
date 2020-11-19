import apollo from 'apollo-server-koa';
import { typeDef as Device, resolvers as deviceResolvers } from './device.js';

const Query = apollo.gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
  type Subscription {
    _empty: String
  }
`;

export default apollo.makeExecutableSchema({
  typeDefs: [Query, Device],
  resolvers: { ...deviceResolvers },
});
