import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Participant {
  @PrimaryColumn()
  courseId: string;

  @Column()
  userId: string;

  @Column()
  roleId: string;
}
