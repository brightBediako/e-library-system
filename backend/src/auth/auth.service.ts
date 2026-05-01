import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PasswordHashService } from './password-hash.service';
import { UserEntity } from '../users/user.entity';

interface LoginPayload {
  email: string;
  password: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService,
    private readonly passwordHashService: PasswordHashService,
  ) {}

  async login(payload: LoginPayload) {
    const normalizedEmail = payload.email.trim().toLowerCase();

    const user = await this.usersRepository.findOne({
      where: { email: normalizedEmail },
    });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    const { valid, upgradedHash } = await this.passwordHashService.verifyAndMaybeUpgrade(
      payload.password,
      user.passwordHash,
    );

    if (!valid) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    if (upgradedHash) {
      await this.usersRepository.update(user.id, { passwordHash: upgradedHash });
      user.passwordHash = upgradedHash;
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
