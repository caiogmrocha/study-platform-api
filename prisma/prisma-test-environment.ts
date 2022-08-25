import type { EnvironmentContext, JestEnvironmentConfig } from '@jest/environment';
import dotenv from 'dotenv';
import NodeEnvironment from 'jest-environment-node';
import { createConnection } from 'mysql2';
import { exec } from 'node:child_process';
import crypto from 'node:crypto';
import util from 'node:util';

dotenv.config({ path: '.env.test' });

const execSync = util.promisify(exec);

export default class PrismaTestEnvironment extends NodeEnvironment {
  private dbName: string;
  private connectionString: string;

  constructor (config: JestEnvironmentConfig, context: EnvironmentContext) {
    super(config, context);

    const dbUser = process.env.DATABASE_USER;
    const dbPass = process.env.DATABASE_PASS ?? null;
    const dbHost = process.env.DATABASE_HOST;
    const dbPort = process.env.DATABASE_PORT;

    this.dbName = `test_${crypto.randomUUID().split('-').join('_')}`;
    this.connectionString = `mysql://${dbUser}:${dbPass}@${dbHost}:${dbPort}/${this.dbName}`;
  }

  async setup () {
    process.env.DATABASE_URL = this.connectionString;
    this.global.process.env.DATABASE_URL = this.connectionString;

    await execSync('npx prisma migrate deploy');

    return super.setup();
  }

  async teardown () {
    const client = createConnection({
      host: process.env.DATABASE_HOST,
      user: process.env.DATABASE_USER,
      password: process.env.DATABASE_PASS
    });

    client.query(`DROP DATABASE IF EXISTS ${this.dbName}`);
    client.end();
  }
}
