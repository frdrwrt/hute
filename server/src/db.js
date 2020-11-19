import Knex from 'knex';
import config from 'config';

const knexConfig = {
  client: 'pg',
  connection: config.get('DB_CONNECTION'),
  migrations: {
    directory: './migrations',
  },
  seeds: {
    directory: './seeds',
  },
};

export default Knex(knexConfig);
