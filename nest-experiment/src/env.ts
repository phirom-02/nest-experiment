import * as dotenv from 'dotenv';
import { expand } from 'dotenv-expand';

import { ZodError, z } from 'zod';

const stringBoolean = z.coerce
  .string()
  .transform((value) => {
    return value === 'true';
  })
  .default('false');

const EnvSchema = z.object({
  NODE_ENV: z.string().default('development'),
  DATABASE_URL: z.string(),
  DB_MIGRATING: stringBoolean,
  DB_SEEDING: stringBoolean,
});

export type EnvSchema = z.infer<typeof EnvSchema>;

expand(
  dotenv.config({ path: `.env.${process.env.NODE_ENV || 'development'}` }),
);

try {
  EnvSchema.parse(process.env);
} catch (error) {
  if (error instanceof ZodError) {
    let message = 'Missing required value in .env:\n';
    error.issues.forEach((issue) => {
      message += issue.path[0] + '\n';
    });
    const e = new Error(message);
    e.stack = '';
    throw e;
  } else {
    console.error(error);
  }
}

export default EnvSchema.parse(process.env);
