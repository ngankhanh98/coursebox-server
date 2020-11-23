import { Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Participant {
  @PrimaryColumn()
  courseId: string;

  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  roleId: string;
}
