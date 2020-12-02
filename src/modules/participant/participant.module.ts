import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserCoursesCourse } from 'src/entities/user_courses_course.entity';
import { ParticipantService } from './participant.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserCoursesCourse])],
  providers: [ParticipantService],
  exports: [ParticipantService],
})
export class ParticipantModule {}
