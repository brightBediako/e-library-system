import { config as dotenvConfig } from 'dotenv';
import { DataSource } from 'typeorm';
import { BookEntity } from '../books/book.entity';
import { BorrowEntity } from '../borrow/borrow.entity';
import { UserEntity } from '../users/user.entity';

dotenvConfig();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'e_library_system',
  entities: [UserEntity, BookEntity, BorrowEntity],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
