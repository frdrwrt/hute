import Model from './Model.js';

class Record extends Model {
  static get tableName() {
    return 'records';
  }

  constructor(db) {
    super(db, Record.tableName);
  }

  calculate;
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
}
export default Record;
