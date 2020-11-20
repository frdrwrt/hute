export default class Model {
  constructor(db, table) {
    this.db = db;
    this.table = table;
  }

  all() {
    return this.db(this.table).select();
  }

  find(conditions) {
    return this.db(this.table).where(conditions).select();
  }

  findOne(conditions) {
    return this.db(this.table).where(conditions).first();
  }

  findById(id) {
    return this.db(this.table).where({ id }).select().first();
  }

  insert(values) {
    return this.db(this.table).insert(values).returning('*');
  }

  update(values) {
    return this.db(this.table).where({ id: values.id }).update(values).returning('*');
  }

  delete(id) {
    return this.db(this.table).where({ id }).delete();
  }
}
