import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class createCourseDto {
  @ApiProperty()
  courseId: string;

  @ApiProperty()
  title: string;
}

export class updateCourseDto {
  @Expose()
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
