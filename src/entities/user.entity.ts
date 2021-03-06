import { ApiProperty } from '@nestjs/swagger';
import { userInfo } from 'os';
import { CourseModule } from 'src/modules/course/course.module';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToMany,
  JoinTable,
  Index,
  PrimaryColumn,
  OneToMany,
} from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class User {
  @PrimaryColumn()
  userId: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Index({ fulltext: true })
  @Column()
  fullname: string;

  @ManyToMany(
    () => Course,
    course => course.users,
  )
  @JoinTable({
    name: 'user_courses_course',
    joinColumn: {
      name: 'userId',
      referencedColumnName: 'userId',
    },
    inverseJoinColumn: {
      name: 'courseId',
      referencedColumnName: 'courseId',
    },
  })
  courses: Course[];

  @OneToMany(
    () => Course,
    course => course.teacher,
  )
  teaching_courses: Course[];
}
