import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { randomUUID } from 'crypto';
import { QueryFailedError, Repository } from 'typeorm';
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

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(BookEntity)
    private readonly booksRepository: Repository<BookEntity>,
  ) {}

  getBooks() {
    return this.booksRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  async getBookById(id: string) {
    const book = await this.booksRepository.findOneBy({ id });

    if (!book) {
      throw new NotFoundException('Book not found.');
    }

    return book;
  }

  async createBook(payload: CreateBookPayload) {
    try {
      const book = this.booksRepository.create({
        id: randomUUID(),
        title: payload.title.trim(),
        author: payload.author.trim(),
        isbn: payload.isbn.trim(),
        bookType: payload.bookType,
        storage: payload.storage.trim(),
      });

      return await this.booksRepository.save(book);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as QueryFailedError & { code?: string }).code === '23505'
      ) {
        throw new ConflictException('A book with this ISBN already exists.');
      }

      throw error;
    }
  }

  async updateBook(id: string, payload: UpdateBookPayload) {
    const book = await this.getBookById(id);

    if (payload.title !== undefined) {
      book.title = payload.title.trim();
    }
    if (payload.author !== undefined) {
      book.author = payload.author.trim();
    }
    if (payload.isbn !== undefined) {
      book.isbn = payload.isbn.trim();
    }
    if (payload.bookType !== undefined) {
      book.bookType = payload.bookType;
    }
    if (payload.storage !== undefined) {
      book.storage = payload.storage.trim();
    }

    try {
      return await this.booksRepository.save(book);
    } catch (error) {
      if (
        error instanceof QueryFailedError &&
        (error as QueryFailedError & { code?: string }).code === '23505'
      ) {
        throw new ConflictException('A book with this ISBN already exists.');
      }

      throw error;
    }
  }

  async deleteBook(id: string) {
    const book = await this.getBookById(id);
    await this.booksRepository.remove(book);

    return {
      id,
      deleted: true,
    };
  }
}
