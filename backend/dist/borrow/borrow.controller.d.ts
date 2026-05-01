import type { Request } from 'express';
import type { JwtPayload } from '../auth/jwt-payload.interface';
import { BorrowService } from './borrow.service';
interface IssueBorrowBody {
    userId: string;
    bookId: string;
    dueDate: string;
}
export declare class BorrowController {
    private readonly borrowService;
    constructor(borrowService: BorrowService);
    getBorrows(req: Request & {
        user: JwtPayload;
    }): Promise<import("./borrow.entity").BorrowEntity[]>;
    issueBorrow(body: IssueBorrowBody): Promise<import("./borrow.entity").BorrowEntity>;
    returnBorrow(id: string): Promise<import("./borrow.entity").BorrowEntity>;
}
export {};
