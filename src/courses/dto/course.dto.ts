import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class createCourseDto {
  @ApiProperty()
  course_id: string;

  @ApiProperty()
  title: string;
}

export class updateCourseDto {
  @ApiProperty()
  course_id: string;

  @ApiProperty()
  title: string;

  //   FIXME:
  @Exclude()
  teacher_id: string;
}
