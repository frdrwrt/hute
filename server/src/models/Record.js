import Model from './Model.js';

class Record extends Model {
  static get tableName() {
    return 'records';
  }

  constructor(db) {
    super(db, Record.tableName);
  }

  all() {
    return this.db(Record.tableName).select().orderBy('time', 'asc');
  }

  findByDeviceId({ deviceId, from, to }) {
    const query = this.db(Record.tableName).select().where({ deviceId }).orderBy('time', 'asc');
    if (from) {
      query.where('time', '>=', from);
    }
    if (to) {
      query.where('time', '<=', to);
    }
    return query;
  }

  deleteByDeviceId({ deviceId }) {
    return this.db(Record.tableName).where({ deviceId }).delete();
  }
}
export default Record;
