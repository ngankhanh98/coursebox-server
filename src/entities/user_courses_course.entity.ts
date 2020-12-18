import { DefaultValuePipe } from '@nestjs/common';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity('user_courses_course')
export class UserCoursesCourse {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  courseId: string;

  @Column({
    default: 'member',
  })
  roleId: string;
}
