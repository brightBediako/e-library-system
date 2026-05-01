"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedDefaultAdmin1776690100000 = void 0;
const ADMIN_ID = '00000000-0000-4000-8000-000000000001';
const PASSWORD_SHA256 = '46708f23d682fef9aa996ecbb139bfb6c9ffdc039905ad6ad5c85a88b9411d97';
class SeedDefaultAdmin1776690100000 {
    name = 'SeedDefaultAdmin1776690100000';
    async up(queryRunner) {
        await queryRunner.query(`
      INSERT INTO users (id, full_name, email, password_hash, role, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, now(), now())
      ON CONFLICT (email) DO NOTHING
    `, [ADMIN_ID, 'Admin User', 'admin@institution.edu', PASSWORD_SHA256, 'admin']);
    }
    async down(queryRunner) {
        await queryRunner.query(`DELETE FROM users WHERE id = $1`, [ADMIN_ID]);
    }
}
exports.SeedDefaultAdmin1776690100000 = SeedDefaultAdmin1776690100000;
//# sourceMappingURL=1776690100000-SeedDefaultAdmin.js.map