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
export declare class UsersService {
    private readonly usersRepository;
    constructor(usersRepository: Repository<UserEntity>);
    getUsers(): Promise<UserListItem[]>;
    createLibrarian(payload: CreateLibrarianPayload): Promise<{
        id: string;
        fullName: string;
        email: string;
    }>;
}
export {};
