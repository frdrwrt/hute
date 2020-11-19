import models from '../models/index.js';
import db from '../db.js';

const grabFromDB = async (tableName, whereClause) => {
  const tableQuery = db(tableName);
  if (whereClause) {
    tableQuery.where(whereClause);
  }
  return tableQuery;
};

const hasDevices = async (devices) => {
  return models.device.insert(devices).returning('*');
};

export default {
  grabFromDB,
  hasDevices,
};
