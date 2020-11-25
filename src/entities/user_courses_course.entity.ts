import { Column, Entity, ManyToMany, ManyToOne, PrimaryColumn } from 'typeorm';
import { Course } from './course.entity';
import { User } from './user.entity';

@Entity('user_courses_course')
export class UserCoursesCourse {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  courseId: number;

  @Column()
  roleId: string;
}
