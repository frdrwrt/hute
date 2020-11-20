import apollo from 'apollo-server-koa';

export const typeDef = apollo.gql`
  extend type Query {
    devices: [Device!]!
    device(id: ID!): Device!
  }
  extend type Mutation {
    createDevice(name: String!): Device
    updateDevice(id: ID!, name: String): Device
    deleteDevice(id: ID!): Device
  }
  type Device {
    id: ID!
    name: String!
    createdAt: Date!
    updatedAt: Date!
  }
`;

export const resolvers = {
  Query: {
    devices: async (parent, args, { models }, info) => {
      const result = await models.device.all();
      return result;
    },
    device: async (parent, args, { models }, info) => {
      const result = await models.device.findById(args.id);
      return result;
    },
  },
  Mutation: {
    createDevice: async (parent, args, { models }, info) => {
      const [result] = await models.device.insert(args);
      return result;
    },
    updateDevice: async (parent, args, { models }, info) => {
      const [result] = await models.device.update(args);
      return result;
    },
    deleteDevice: async (parent, args, { models }, info) => {
      await models.device.delete(args.id);
    },
  },
};
