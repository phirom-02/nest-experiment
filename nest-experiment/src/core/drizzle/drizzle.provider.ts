import { Injectable, OnModuleInit } from '@nestjs/common';
import { NodePgDatabase, drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { Pool } from 'pg';
import env from 'src/env';

@Injectable()
export class DrizzleProvider implements OnModuleInit {
  db: NodePgDatabase<typeof schema>;

  constructor() {}

  async onModuleInit() {
    const client = new Pool({
      connectionString: env.DATABASE_URL,
      max: env.DB_MIGRATING || env.DB_SEEDING ? 1 : undefined,
    });
    await client.connect();
    this.db = drizzle(client, {
      schema,
      logger: true,
    });
  }
}
