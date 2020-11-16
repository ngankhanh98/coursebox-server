import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TeachersModule } from './teachers/teachers.module';

@Module({
  imports: [TeachersModule, DatabaseModule, ConfigModule.forRoot()],
})
export class AppModule {}
