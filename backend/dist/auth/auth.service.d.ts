import { JwtService } from '@nestjs/jwt';
type AuthRole = 'admin' | 'librarian' | 'student';
interface LoginPayload {
    email: string;
    password: string;
}
export declare class AuthService {
    private readonly jwtService;
    private readonly mockUsers;
    constructor(jwtService: JwtService);
    login(payload: LoginPayload): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            role: AuthRole;
        };
    }>;
}
export {};
