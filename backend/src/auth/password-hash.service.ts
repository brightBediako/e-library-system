import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { createHash } from 'node:crypto';

const BCRYPT_ROUNDS = 10;

export function isBcryptHash(stored: string): boolean {
  return (
    stored.startsWith('$2a$') ||
    stored.startsWith('$2b$') ||
    stored.startsWith('$2y$')
  );
}

@Injectable()
export class PasswordHashService {
  async hashPassword(plain: string): Promise<string> {
    return bcrypt.hash(plain, BCRYPT_ROUNDS);
  }

  /**
   * Verifies password against bcrypt or legacy SHA-256 (hex).
   * Returns replacement bcrypt hash when legacy matched so callers can upgrade DB rows.
   */
  async verifyAndMaybeUpgrade(
    plain: string,
    storedHash: string,
  ): Promise<{ valid: boolean; upgradedHash?: string }> {
    if (isBcryptHash(storedHash)) {
      const valid = await bcrypt.compare(plain, storedHash);
      return { valid };
    }

    const legacyHex = createHash('sha256').update(plain).digest('hex');
    if (legacyHex === storedHash) {
      const upgradedHash = await bcrypt.hash(plain, BCRYPT_ROUNDS);
      return { valid: true, upgradedHash };
    }

    return { valid: false };
  }
}
