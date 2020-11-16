import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { TeachersModule } from './teachers/teachers.module';
import { CoursesController } from './courses/courses.controller';
import { CoursesModule } from './courses/courses.module';

@Module({
  imports: [TeachersModule, DatabaseModule, ConfigModule.forRoot(), CoursesModule],
  controllers: [CoursesController],
})
export class AppModule {}
