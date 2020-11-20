import apollo from 'apollo-server-koa';
import { calculateDewPoint } from '../utils/calculations.js';

export const typeDef = apollo.gql`
  extend type Query {
    records: [Record!]!
    recordsForDevice(deviceId: ID!, from: Date, to: Date): [Record]!
  }
  extend type Mutation {
    createRecord(deviceId: ID!, temperature: Float, humidity: Float): Record!
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
      console.log(records);
      return records.map(enrichRecord);
    },
  },
  Mutation: {
    createRecord: async (parent, args, { models }, info) => {
      const [record] = await models.record.insert(args).returning('*');
      return enrichRecord(record);
    },
  },
};
