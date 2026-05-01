import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import type { Request } from 'express';
import type { JwtPayload } from '../auth/jwt-payload.interface';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Roles } from '../auth/roles.decorator';
import { RolesGuard } from '../auth/roles.guard';
import { BorrowService } from './borrow.service';

interface IssueBorrowBody {
  userId: string;
  bookId: string;
  dueDate: string;
}

@Controller('borrow')
@UseGuards(JwtAuthGuard)
export class BorrowController {
  constructor(private readonly borrowService: BorrowService) {}

  @Get()
  getBorrows(@Req() req: Request & { user: JwtPayload }) {
    return this.borrowService.getBorrows(req.user);
  }

  @Post('issue')
  @UseGuards(RolesGuard)
  @Roles('admin', 'librarian')
  issueBorrow(@Body() body: IssueBorrowBody) {
    return this.borrowService.issueBorrow(body);
  }

  @Patch(':id/return')
  @UseGuards(RolesGuard)
  @Roles('admin', 'librarian')
  returnBorrow(@Param('id') id: string) {
    return this.borrowService.returnBorrow(id);
  }
}
