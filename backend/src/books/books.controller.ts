import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
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
@UseGuards(JwtAuthGuard)
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
  @UseGuards(RolesGuard)
  @Roles('admin', 'librarian')
  createBook(@Body() body: CreateBookBody) {
    return this.booksService.createBook(body);
  }

  @Patch(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'librarian')
  updateBook(@Param('id') id: string, @Body() body: UpdateBookBody) {
    return this.booksService.updateBook(id, body);
  }

  @Delete(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'librarian')
  deleteBook(@Param('id') id: string) {
    return this.booksService.deleteBook(id);
  }
}
