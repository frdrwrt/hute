export const up = function (knex) {
  return knex.schema.createTable('devices', (table) => {
    table.increments('id').unsigned().primary();

    table.string('name');

    table.dateTime('updated_at').default(knex.fn.now()).notNull();
    table.dateTime('created_at').default(knex.fn.now()).notNull();
  });
};

export const down = function (knex) {};
