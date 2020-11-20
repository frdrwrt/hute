import Knex from 'knex';
import knexStringCase from 'knex-stringcase';
import pg from 'pg';

pg.types.setTypeParser(pg.types.builtins.INT8, (value) => {
  return parseInt(value);
});

pg.types.setTypeParser(pg.types.builtins.FLOAT8, (value) => {
  return parseFloat(value);
});

pg.types.setTypeParser(pg.types.builtins.NUMERIC, (value) => {
  return parseFloat(value);
});

pg.types.setTypeParser(pg.types.builtins.DATE, (value) => {
  return new Date(value).toISOString();
});

pg.types.setTypeParser(pg.types.builtins.TIME, (value) => {
  return new Date(value).toISOString();
});

pg.types.setTypeParser(pg.types.builtins.TIMESTAMP, (value) => {
  return new Date(value).toISOString();
});

pg.types.setTypeParser(pg.types.builtins.TIMESTAMPTZ, (value) => {
  return new Date(value).toISOString();
});

const knexConfig = {
  client: 'pg',
  connection: {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
  },
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: '../../.seeds',
  },
};

console.log(knexConfig);

const kenxConfigModified = knexStringCase(knexConfig);

export const db = Knex(kenxConfigModified);
export default kenxConfigModified;
