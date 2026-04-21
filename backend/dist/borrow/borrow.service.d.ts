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
export declare class BorrowService {
    private readonly borrowRepository;
    private readonly usersRepository;
    private readonly booksRepository;
    constructor(borrowRepository: Repository<BorrowEntity>, usersRepository: Repository<UserEntity>, booksRepository: Repository<BookEntity>);
    getBorrows(actor: JwtPayload): Promise<BorrowEntity[]>;
    issueBorrow(payload: IssueBorrowPayload): Promise<BorrowEntity>;
    returnBorrow(id: string): Promise<BorrowEntity>;
}
export {};
