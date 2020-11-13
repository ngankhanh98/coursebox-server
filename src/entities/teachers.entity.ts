import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity()
export class Teachers {
  @PrimaryColumn()
  teacher_id: string;

  @Column()
  fullname: string;
}
