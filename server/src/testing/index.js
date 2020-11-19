import { createTestClient } from 'apollo-server-testing';
import knexCleaner from 'knex-cleaner';
import db from '../db.js';
import { apolloServer } from '../server.js';
import hasData from './hasData';

export const integration = () => {
  const Tester = {};
  const testClient = createTestClient(apolloServer);

  Object.assign(Tester, testClient);
  Object.assign(Tester, hasData);

  afterEach(async () => {
    await knexCleaner.clean(db);
  });

  afterAll(async () => {
    await db.destroy();
  });

  return {
    Tester,
  };
};
