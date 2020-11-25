import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Course } from 'src/entities/course.entity';
import { CourseService } from './course.service';
import { CourseController } from './course.controller';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { getRepository } from 'typeorm';
import { User } from 'src/entities/user.entity';
import { Participant } from 'src/entities/participant.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Course, Participant])],
  providers: [CourseService],
  exports: [CourseService],
  controllers: [CourseController],
})
export class CourseModule {}
