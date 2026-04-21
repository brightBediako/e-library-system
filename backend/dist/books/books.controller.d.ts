import { BookType } from './book.entity';
import { BooksService } from './books.service';
interface CreateBookBody {
    title: string;
    author: string;
    isbn: string;
    bookType: BookType;
    storage: string;
}
interface UpdateBookBody {
    title?: string;
    author?: string;
    isbn?: string;
    bookType?: BookType;
    storage?: string;
}
export declare class BooksController {
    private readonly booksService;
    constructor(booksService: BooksService);
    getBooks(): Promise<import("./book.entity").BookEntity[]>;
    getBookById(id: string): Promise<import("./book.entity").BookEntity>;
    createBook(body: CreateBookBody): Promise<import("./book.entity").BookEntity>;
    updateBook(id: string, body: UpdateBookBody): Promise<import("./book.entity").BookEntity>;
    deleteBook(id: string): Promise<{
        id: string;
        deleted: boolean;
    }>;
}
export {};
