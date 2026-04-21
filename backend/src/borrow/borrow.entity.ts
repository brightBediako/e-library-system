import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export type BorrowStatus = 'active' | 'returned' | 'overdue';

@Entity({ name: 'borrows' })
export class BorrowEntity {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @Column({ name: 'user_id', type: 'varchar', length: 40 })
  userId: string;

  @Column({ name: 'book_id', type: 'varchar', length: 40 })
  bookId: string;

  @Column({ name: 'borrowed_at', type: 'timestamp' })
  borrowedAt: Date;

  @Column({ name: 'due_date', type: 'timestamp' })
  dueDate: Date;

  @Column({ name: 'returned_at', type: 'timestamp', nullable: true })
  returnedAt: Date | null;

  @Column({ type: 'varchar', length: 20, default: 'active' })
  status: BorrowStatus;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
