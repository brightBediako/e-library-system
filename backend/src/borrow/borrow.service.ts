import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'node:crypto';
import { Repository } from 'typeorm';
import type { JwtPayload } from '../auth/jwt-payload.interface';
import { BookEntity } from '../books/book.entity';
import { UserEntity } from '../users/user.entity';
import { BorrowEntity } from './borrow.entity';

interface IssueBorrowPayload {
  userId: string;
  bookId: string;
  dueDate: string;
}

@Injectable()
export class BorrowService {
  constructor(
    @InjectRepository(BorrowEntity)
    private readonly borrowRepository: Repository<BorrowEntity>,
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    @InjectRepository(BookEntity)
    private readonly booksRepository: Repository<BookEntity>,
  ) {}

  getBorrows(actor: JwtPayload) {
    if (actor.role === 'student') {
      return this.borrowRepository.find({
        where: { userId: actor.sub },
        order: { borrowedAt: 'DESC' },
      });
    }

    return this.borrowRepository.find({
      order: { borrowedAt: 'DESC' },
    });
  }

  async issueBorrow(payload: IssueBorrowPayload) {
    const user = await this.usersRepository.findOneBy({ id: payload.userId });
    if (!user) {
      throw new NotFoundException('User not found.');
    }

    const book = await this.booksRepository.findOneBy({ id: payload.bookId });
    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    const dueDate = new Date(payload.dueDate);
    if (Number.isNaN(dueDate.getTime())) {
      throw new BadRequestException('Invalid due date.');
    }

    const existingActiveBorrow = await this.borrowRepository.findOneBy({
      bookId: payload.bookId,
      status: 'active',
    });
    if (existingActiveBorrow) {
      throw new BadRequestException('Book is already borrowed.');
    }

    const borrow = this.borrowRepository.create({
      id: randomUUID(),
      userId: payload.userId,
      bookId: payload.bookId,
      borrowedAt: new Date(),
      dueDate,
      returnedAt: null,
      status: 'active',
    });

    return this.borrowRepository.save(borrow);
  }

  async returnBorrow(id: string) {
    const borrow = await this.borrowRepository.findOneBy({ id });
    if (!borrow) {
      throw new NotFoundException('Borrow record not found.');
    }

    if (borrow.status === 'returned') {
      throw new BadRequestException('Book is already returned.');
    }

    borrow.status = 'returned';
    borrow.returnedAt = new Date();

    return this.borrowRepository.save(borrow);
  }
}
