import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Course {
  // @ApiProperty()
  @PrimaryColumn()
  courseId: string;

  @ManyToOne(
    () => User,
    user => user.teaching_courses,
  )
  teacher: User;

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

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
