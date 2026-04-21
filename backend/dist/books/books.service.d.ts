import { Repository } from 'typeorm';
import { BookEntity, BookType } from './book.entity';
interface CreateBookPayload {
    title: string;
    author: string;
    isbn: string;
    bookType: BookType;
    storage: string;
}
interface UpdateBookPayload {
    title?: string;
    author?: string;
    isbn?: string;
    bookType?: BookType;
    storage?: string;
}
export declare class BooksService {
    private readonly booksRepository;
    constructor(booksRepository: Repository<BookEntity>);
    getBooks(): Promise<BookEntity[]>;
    getBookById(id: string): Promise<BookEntity>;
    createBook(payload: CreateBookPayload): Promise<BookEntity>;
    updateBook(id: string, payload: UpdateBookPayload): Promise<BookEntity>;
    deleteBook(id: string): Promise<{
        id: string;
        deleted: boolean;
    }>;
}
export {};
