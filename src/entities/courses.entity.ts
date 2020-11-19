import { ApiProperty } from '@nestjs/swagger';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Courses {
  @ApiProperty()
  @PrimaryGeneratedColumn()
  course_id: string;

  @ApiProperty()
  @Column()
  title: string;
  
  @ApiProperty()
  @Column()
  teacher_id: string;
}
