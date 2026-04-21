import * as bcrypt from 'bcryptjs';
import { MigrationInterface, QueryRunner } from 'typeorm';

/** SHA-256 hex of Pass123!, matching legacy seed + librarian creation. */
const LEGACY_SHA256_ADMIN = '46708f23d682fef9aa996ecbb139bfb6c9ffdc039905ad6ad5c85a88b9411d97';

export class UpgradeLegacyAdminPasswordToBcrypt1776690200000 implements MigrationInterface {
  name = 'UpgradeLegacyAdminPasswordToBcrypt1776690200000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    const bcryptHash = await bcrypt.hash('Pass123!', 10);

    await queryRunner.query(
      `
      UPDATE users
      SET password_hash = $1, updated_at = now()
      WHERE email = $2 AND password_hash = $3
    `,
      [bcryptHash, 'admin@institution.edu', LEGACY_SHA256_ADMIN],
    );
  }

  public async down(_queryRunner: QueryRunner): Promise<void> {
    // Intentionally no-op: reverting to a raw SHA-256 string is unsafe if passwords were re-hashed.
  }
}
