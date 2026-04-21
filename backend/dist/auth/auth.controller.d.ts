import { AuthService } from './auth.service';
interface LoginBody {
    email: string;
    password: string;
}
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: LoginBody): Promise<{
        access_token: string;
        user: {
            id: string;
            email: string;
            fullName: string;
            role: "admin" | "librarian" | "student";
        };
    }>;
}
export {};
