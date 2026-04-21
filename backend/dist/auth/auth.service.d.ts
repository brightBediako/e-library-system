import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { PasswordHashService } from './password-hash.service';
import { UserEntity } from '../users/user.entity';
interface LoginPayload {
    email: string;
    password: string;
}
export declare class AuthService {
    private readonly usersRepository;
    private readonly jwtService;
    private readonly passwordHashService;
    constructor(usersRepository: Repository<UserEntity>, jwtService: JwtService, passwordHashService: PasswordHashService);
    login(payload: LoginPayload): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            role: import("../users/user.entity").UserRole;
        };
    }>;
}
export {};
