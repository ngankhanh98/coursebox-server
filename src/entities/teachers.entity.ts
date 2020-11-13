import { ApiProperty } from '@nestjs/swagger';
import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity()
export class Teachers {
  @ApiProperty()
  @PrimaryColumn()
  teacher_id: string;

  @ApiProperty()
  @Column()
  fullname: string;
}
