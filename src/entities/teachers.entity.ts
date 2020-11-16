import { ApiProperty } from '@nestjs/swagger';
import { PrimaryColumn, Column, Entity, Index } from 'typeorm';

@Entity()
export class Teachers {
  @ApiProperty()
  @Index({ fulltext: true })
  @PrimaryColumn()
  teacher_id: string;

  @ApiProperty()
  @Index({ fulltext: true })
  @Column()
  fullname: string;
}
