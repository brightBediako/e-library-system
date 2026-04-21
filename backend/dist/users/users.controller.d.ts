import { UsersService } from './users.service';
interface CreateLibrarianBody {
    fullName: string;
    email: string;
    password: string;
}
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    getUsers(): Promise<import("./users.service").UserListItem[]>;
    createLibrarian(body: CreateLibrarianBody): Promise<{
        id: string;
        fullName: string;
        email: string;
    }>;
}
export {};
