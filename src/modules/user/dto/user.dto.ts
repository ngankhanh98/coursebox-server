import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { Course } from 'src/entities/course.entity';

export class getUser {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class getUserBase {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  @Exclude()
  password: string;
}

export class updateUser {
  @Exclude()
  @Expose()
  userId: string;

  @Exclude()
  @Expose()
  username: string;

  @ApiProperty()
  password: string;
}
