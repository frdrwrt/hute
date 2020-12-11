import apollo from 'apollo-server';
import { pubsub } from '../server.js';
import { calculateDewPoint } from '../utils/calculations.js';

export const typeDef = apollo.gql`
  extend type Query {
    records: [Record!]!
    recordsForDevice(deviceId: ID!, from: Date, to: Date): [Record]!
  }
  extend type Mutation {
    createRecord(deviceId: ID!, temperature: Float, humidity: Float): Record!
    deleteRecordsForDevice(deviceId: ID!): ID
  }
  extend type Subscription {
    newRecord(deviceId: ID!): Record
  }
  type Record {
    time: Date!
    deviceId: ID!
    temperature: Float
    humidity: Float
    dewPoint: Float
  }
`;

const enrichRecord = (record) =>
  Object.assign(record, {
    dewPoint: calculateDewPoint(record.temperature, record.humidity),
  });

export const resolvers = {
  Query: {
    records: async (parent, args, { models }, info) => {
      const records = await models.record.all();
      return records.map(enrichRecord);
    },
    recordsForDevice: async (parent, args, { models }, info) => {
      const records = await models.record.findByDeviceId(args);
      return records.map(enrichRecord);
    },
  },
  Mutation: {
    createRecord: async (parent, args, { models, pubsub }, info) => {
      const [record] = await models.record.insert(args).returning('*');
      const enrichedRecord = enrichRecord(record);
      pubsub.publish('NEW_RECORD', { newRecord: enrichedRecord });
      return enrichedRecord;
    },
    deleteRecordsForDevice: async (parent, args, { models }, info) => {
      await models.record.deleteByDeviceId(args);
      return args.id;
    },
  },
  Subscription: {
    newRecord: {
      subscribe: apollo.withFilter(
        () => pubsub.asyncIterator(['NEW_RECORD']),
        (payload, variables) => {
          return payload.newRecord.deviceId === variables.deviceId;
        },
      ),
    },
  },
};
