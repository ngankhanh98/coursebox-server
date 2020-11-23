import { ApiProperty } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';

export class getUser {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}

export class getUserWithoutPassword {
  @ApiProperty()
  userId: string;

  @ApiProperty()
  username: string;

  // @Exclude()
  // @Expose()
  // password: string;
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
