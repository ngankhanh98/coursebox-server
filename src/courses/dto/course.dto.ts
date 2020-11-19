import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

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

  // FIXME: This should not appear in PATCH - /courses/{course_id}
  @Exclude()
  @ApiProperty()
  teacher_id: string;
}
