import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Allow } from 'class-validator';

export class updateCourseDto {
  // @Expose()
  // @Exclude()
  // @Allow()
  courseId: string;

  @ApiProperty()
  title: string;
}

export class getCourseDto {
  @ApiProperty()
  courseId: string;

  @ApiProperty()
  title: string;
}
