import Model from './Model.js';

class Device extends Model {
  static get tableName() {
    return 'devices';
  }

  constructor(db) {
    super(db, Device.tableName);
  }
}
export default Device;
