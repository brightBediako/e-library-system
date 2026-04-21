import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
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

@Controller('books')
export class BooksController {
  constructor(private readonly booksService: BooksService) {}

  @Get()
  getBooks() {
    return this.booksService.getBooks();
  }

  @Get(':id')
  getBookById(@Param('id') id: string) {
    return this.booksService.getBookById(id);
  }

  @Post()
  createBook(@Body() body: CreateBookBody) {
    return this.booksService.createBook(body);
  }

  @Patch(':id')
  updateBook(@Param('id') id: string, @Body() body: UpdateBookBody) {
    return this.booksService.updateBook(id, body);
  }

  @Delete(':id')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
