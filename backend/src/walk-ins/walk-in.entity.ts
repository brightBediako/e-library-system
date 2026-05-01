import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'walk_ins' })
export class WalkInEntity {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @Column({ name: 'student_name', type: 'varchar', length: 150 })
  studentName: string;

  @Column({ name: 'index_no', type: 'varchar', length: 60 })
  indexNo: string;

  @Column({ name: 'class_name', type: 'varchar', length: 80 })
  className: string;

  @Column({ name: 'time_in', type: 'datetime' })
  timeIn: Date;

  @Column({ name: 'time_out', type: 'datetime', nullable: true })
  timeOut: Date | null;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;
}
