import { Repository } from 'typeorm';
import { PasswordHashService } from '../auth/password-hash.service';
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
export declare class UsersService {
    private readonly usersRepository;
    private readonly passwordHashService;
    constructor(usersRepository: Repository<UserEntity>, passwordHashService: PasswordHashService);
    getUsers(): Promise<UserListItem[]>;
    createLibrarian(payload: CreateLibrarianPayload): Promise<{
        id: string;
        fullName: string;
        email: string;
    }>;
}
export {};
