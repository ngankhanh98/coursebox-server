import { ApiProperty } from '@nestjs/swagger';

export class getTeacherDto {
  @ApiProperty()
  teacher_id: string;

  @ApiProperty()
  fullname: string;
}
