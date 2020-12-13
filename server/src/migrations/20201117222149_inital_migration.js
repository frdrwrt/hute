export const up = async function (knex) {
  await knex.schema.raw(
    'CREATE EXTENSION IF NOT EXISTS timescaledb CASCADE;CREATE EXTENSION IF NOT EXISTS "uuid-ossp";',
  );
  const devices = knex.schema.createTable('devices', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));

    table.string('name');

    table.timestamp('updated_at').default(knex.fn.now()).notNull();
    table.timestamp('created_at').default(knex.fn.now()).notNull();
  });

  const records = knex.schema.createTable('records', (table) => {
    table.timestamp('time').default(knex.fn.now()).index().notNull();

    table
      .uuid('device_id')
      .references('id')
      .inTable('devices')
      .onDelete('CASCADE')
      .onUpdate('CASCADE')
      .index()
      .notNull();

    table.decimal('temperature', 4, 2);
    table.decimal('humidity', 5, 2);
  });

  await Promise.all([devices, records]);

  await knex.schema.raw("SELECT create_hypertable('records', 'time');");
};

export const down = function (knex) {};
