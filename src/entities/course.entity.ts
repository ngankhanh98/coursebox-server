import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToMany,
  PrimaryColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { User } from './user.entity';
import { UserCoursesCourse } from './user_courses_course.entity';

@Entity()
export class Course {
  // @ApiProperty()
  @PrimaryColumn()
  courseId: string;

  @ApiProperty()
  @Index({ fulltext: true })
  @Column('text')
  title: string;

  @ApiProperty()
  @ManyToMany(
    () => User,
    user => user.courses,
  )
  users: User[];
}
