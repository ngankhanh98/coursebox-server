import { ApiProperty } from '@nestjs/swagger';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Index,
  ManyToMany,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Course {
  // @ApiProperty()
  @PrimaryGeneratedColumn()
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
