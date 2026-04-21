export type BookType = 'physical' | 'digital';
export declare class BookEntity {
    id: string;
    title: string;
    author: string;
    isbn: string;
    bookType: BookType;
    storage: string;
    createdAt: Date;
    updatedAt: Date;
}
