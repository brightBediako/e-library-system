import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash, randomUUID } from 'crypto';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';

interface CreateLibrarianPayload {
  fullName: string;
  email: string;
  password: string;
}

export interface UserListItem {
  id: string;
  fullName: string;
  email: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
  ) {}

  async getUsers(): Promise<UserListItem[]> {
    const users = await this.usersRepository.find({
      order: { createdAt: 'DESC' },
    });

    return users.map((user) => ({
      id: user.id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
    }));
  }

  async createLibrarian(payload: CreateLibrarianPayload) {
    const passwordHash = createHash('sha256').update(payload.password).digest('hex');
    const librarian = this.usersRepository.create({
      id: randomUUID(),
      fullName: payload.fullName.trim(),
      email: payload.email.trim().toLowerCase(),
      passwordHash,
      role: 'librarian',
    });

    const savedLibrarian = await this.usersRepository.save(librarian);

    return {
      id: savedLibrarian.id,
      fullName: savedLibrarian.fullName,
      email: savedLibrarian.email,
    };
  }
}
