import apollo from 'apollo-server';
import graphql from 'graphql';
import gmr from '@wiicamp/graphql-merge-resolvers';
import { typeDef as Device, resolvers as deviceResolvers } from './device.js';
import { typeDef as Record, resolvers as recordResolvers } from './record.js';

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
  scalar Date 
`;

const dateResolvers = {
  Date: new graphql.GraphQLScalarType({
    name: 'Date',
    description: 'Date as ISO string',
    parseValue(value) {
      return new Date(value).toISOString(); // value from the client
    },
    serialize(value) {
      return new Date(value).toISOString(); // value sent to the client
    },
    parseLiteral(ast) {
      // TODO: understand how we have to handle it here.
      if (ast.kind === graphql.language.Kind.INT) {
        return parseInt(ast.value, 10); // values send from client inline.
      }
      return null;
    },
  }),
};

export default apollo.makeExecutableSchema({
  typeDefs: [Query, Device, Record],
  resolvers: gmr.merge([dateResolvers, deviceResolvers, recordResolvers]),
});
