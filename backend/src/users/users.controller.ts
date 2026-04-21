import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';

interface CreateLibrarianBody {
  fullName: string;
  email: string;
  password: string;
}

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getUsers();
  }

  @Post('librarians')
  createLibrarian(@Body() body: CreateLibrarianBody) {
    return this.usersService.createLibrarian(body);
  }
}
