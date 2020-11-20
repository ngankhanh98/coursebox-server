import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseController } from './modules/course/course.controller';
import { CoursesModule } from './modules/course/course.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    CoursesModule,
    AuthModule,
    UserModule,
  ],
  controllers: [CourseController],
})
export class AppModule {}
