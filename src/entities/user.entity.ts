import { ApiProperty } from '@nestjs/swagger';
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

  @ManyToMany(() => Course)
  @JoinTable()
  courses: Course[];
}
