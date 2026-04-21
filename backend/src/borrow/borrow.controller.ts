import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { BorrowService } from './borrow.service';

interface IssueBorrowBody {
  userId: string;
  bookId: string;
  dueDate: string;
}

@Controller('borrow')
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Get()
  getBorrows() {
    return this.borrowService.getBorrows();
  }

  @Post('issue')
  issueBorrow(@Body() body: IssueBorrowBody) {
    return this.borrowService.issueBorrow(body);
  }

  @Patch(':id/return')
  returnBorrow(@Param('id') id: string) {
    return this.borrowService.returnBorrow(id);
  }
}
