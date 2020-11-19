import apollo from 'apollo-server-koa';

export const typeDef = apollo.gql`
  extend type Query {
    devices: [Device!]!
  }
  extend type Mutation {
    createDevice(name: String!): Device!
  }
  type Device {
    id: ID!
    name: String!
  }
`;

export const resolvers = {
  Query: {
    devices: async (parent, args, { models }, info) => {
      const result = await models.device.all();
      return result;
    },
  },
  Mutation: {
    createDevice: async (parent, args, { models }, info) => {
      console.log(args);
      const [result] = await models.device.insert(args).returning('*');
      console.log(result);
      return result;
    },
  },
};
