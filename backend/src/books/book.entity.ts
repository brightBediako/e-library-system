import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

export type BookType = 'physical' | 'digital';

@Entity({ name: 'books' })
export class BookEntity {
  @PrimaryColumn({ type: 'varchar', length: 40 })
  id: string;

  @Column({ type: 'varchar', length: 200 })
  title: string;

  @Column({ type: 'varchar', length: 150 })
  author: string;

  @Column({ type: 'varchar', length: 32, unique: true })
  isbn: string;

  @Column({ name: 'book_type', type: 'varchar', length: 20, default: 'physical' })
  bookType: BookType;

  @Column({ type: 'varchar', length: 255 })
  storage: string;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp' })
  updatedAt: Date;
}
