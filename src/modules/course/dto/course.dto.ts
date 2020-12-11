import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Allow } from 'class-validator';
import { User } from 'src/entities/user.entity';

export class updateCourseDto {
  // @Expose()
  // @Exclude()
  // @Allow()
  // @ApiProperty()
  courseId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  users: User[];

  @ApiProperty()
  teacher: User;
}

export class getCourseDto {
  @ApiProperty()
  courseId: string;

  @ApiProperty()
  title: string;

  @ApiProperty()
  users: User[];

  @ApiProperty()
  teacher: User;
}
