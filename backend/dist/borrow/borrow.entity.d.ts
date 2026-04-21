export type BorrowStatus = 'active' | 'returned' | 'overdue';
export declare class BorrowEntity {
    id: string;
    userId: string;
    bookId: string;
    borrowedAt: Date;
    dueDate: Date;
    returnedAt: Date | null;
    status: BorrowStatus;
    createdAt: Date;
    updatedAt: Date;
}
