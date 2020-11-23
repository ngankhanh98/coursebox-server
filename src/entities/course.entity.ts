import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column, Index } from 'typeorm';

@Entity()
export class Course {
  // @ApiProperty()
  @PrimaryGeneratedColumn()
  courseId: string;

  @ApiProperty()
  @Index({ fulltext: true })
  @Column()
  title: string;
}
