import { PrimaryColumn, Column, Entity } from 'typeorm';

@Entity('teachers')
export class Teachers {
  @PrimaryColumn()
  teacher_id: string;

  @Column()
  fullname: string;
}
