import models from '../models/index.js';
import { db } from '../db.js';

const grabFromDB = async (tableName, whereClause) => {
  const tableQuery = db(tableName);
  if (whereClause) {
    tableQuery.where(whereClause);
  }
  return tableQuery;
};

const hasDevice = async (device) => {
  return (await models.device.insert(device).returning('*'))[0];
};

const hasDevices = async (devices) => {
  return models.device.insert(devices).returning('*');
};

const hasRecords = async (records) => {
  return models.record.insert(records).returning('*');
};

export default {
  grabFromDB,
  hasDevice,
  hasDevices,
  hasRecords,
};
