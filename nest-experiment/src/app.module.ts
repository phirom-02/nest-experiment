import { Module } from '@nestjs/common';
import { UsersModule } from './modules/users/users.module';
import { DrizzleModule } from './core/drizzle/drizzle.module';

@Module({
  imports: [UsersModule, DrizzleModule.forRoot()],
})
export class AppModule {}
