import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { UserCoursesCourse } from 'src/entities/user_courses_course.entity';
import { ParticipantModule } from '../participant/participant.module';
import { CourseController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  imports: [TypeOrmModule.forFeature([Course]), ParticipantModule],
  providers: [CourseService],
  exports: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
