import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from '../books/book.entity';
import { UserEntity } from '../users/user.entity';
import { BorrowController } from './borrow.controller';
import { BorrowEntity } from './borrow.entity';
import { BorrowService } from './borrow.service';

@Module({
  imports: [TypeOrmModule.forFeature([BorrowEntity, UserEntity, BookEntity])],
  controllers: [BorrowController],
  providers: [BorrowService],
})
export class BorrowModule {}
