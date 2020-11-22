import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Course {
  // @ApiProperty()
  @PrimaryGeneratedColumn()
  courseId: string;

  @ApiProperty()
  @Column()
  title: string;
}
