import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

type AuthRole = 'admin' | 'librarian' | 'student';

interface LoginPayload {
  email: string;
  password: string;
}

interface MockAuthUser {
  id: string;
  email: string;
  fullName: string;
  role: AuthRole;
  password: string;
}

@Injectable()
export class AuthService {
  private readonly mockUsers: MockAuthUser[] = [
    {
      id: 'user-001',
      email: 'admin@institution.edu',
      fullName: 'Admin User',
      role: 'admin',
      password: 'Pass123!',
    },
    {
      id: 'user-002',
      email: 'librarian@institution.edu',
      fullName: 'Librarian User',
      role: 'librarian',
      password: 'Pass123!',
    },
    {
      id: 'user-003',
      email: 'student@institution.edu',
      fullName: 'Student User',
      role: 'student',
      password: 'Pass123!',
    },
  ];

  constructor(private readonly jwtService: JwtService) {}

  async login(payload: LoginPayload) {
    const normalizedEmail = payload.email.trim().toLowerCase();
    const user = this.mockUsers.find(
      (candidate) =>
        candidate.email === normalizedEmail && candidate.password === payload.password,
    );

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const tokenPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = await this.jwtService.signAsync(tokenPayload);

    return {
      access_token: accessToken,
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
      },
    };
  }
}
