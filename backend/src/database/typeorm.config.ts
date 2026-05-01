import { config as dotenvConfig } from 'dotenv';
import { DataSource } from 'typeorm';
import { BookEntity } from '../books/book.entity';
import { BorrowEntity } from '../borrow/borrow.entity';
import { DigitalResourceEntity } from '../resources/digital-resource.entity';
import { UserEntity } from '../users/user.entity';
import { WalkInEntity } from '../walk-ins/walk-in.entity';

dotenvConfig();

export default new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 5432),
  username: process.env.DB_USERNAME ?? 'postgres',
  password: process.env.DB_PASSWORD ?? 'postgres',
  database: process.env.DB_NAME ?? 'elibraryDB',
  entities: [
    UserEntity,
    BookEntity,
    BorrowEntity,
    DigitalResourceEntity,
    WalkInEntity,
  ],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: false,
});
