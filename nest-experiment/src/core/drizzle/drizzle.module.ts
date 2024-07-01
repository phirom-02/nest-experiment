import { DynamicModule, Module } from '@nestjs/common';
import { DrizzleProvider } from './drizzle.provider';

@Module({})
export class DrizzleModule {
  static forRoot(): DynamicModule {
    return {
      module: DrizzleModule,
      providers: [DrizzleProvider],
      exports: [DrizzleProvider],
    };
  }
}
