import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { AuthModule } from './modules/auth/auth.module';
import { CourseController } from './modules/course/course.controller';
import { CourseModule } from './modules/course/course.module';
import { UserModule } from './modules/user/user.module';
import { ParticipantModule } from './modules/participant/participant.module';

@Module({
  imports: [
    DatabaseModule,
    ConfigModule.forRoot(),
    CourseModule,
    AuthModule,
    UserModule,
    ParticipantModule,
  ],
  controllers: [CourseController],
})
export class AppModule {}
