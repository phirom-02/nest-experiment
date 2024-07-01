import { Inject } from '@nestjs/common';
import { DrizzleProvider } from '../drizzle.provider';

export const InjectDb = () => Inject(DrizzleProvider);
