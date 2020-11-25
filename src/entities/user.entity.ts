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
} from 'typeorm';
import { Course } from './course.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  userId: string;

  @Column()
  username: string;

  @Column()
  password: string;

  @Index({ fulltext: true })
  @Column()
  fullname: string;

  @ManyToMany(() => Course, course => course.users)
  @JoinTable()
  courses: Course[];
}
