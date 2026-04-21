"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateUsersTable1776687600000 = void 0;
const typeorm_1 = require("typeorm");
class CreateUsersTable1776687600000 {
    name = 'CreateUsersTable1776687600000';
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'users',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '40',
                    isPrimary: true,
                },
                {
                    name: 'full_name',
                    type: 'varchar',
                    length: '150',
                    isNullable: false,
                },
                {
                    name: 'email',
                    type: 'varchar',
                    length: '160',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'password_hash',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'role',
                    type: 'varchar',
                    length: '20',
                    default: "'student'",
                    isNullable: false,
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                    isNullable: false,
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                    isNullable: false,
                },
            ],
        }), true);
    }
    async down(queryRunner) {
        await queryRunner.dropTable('users');
    }
}
exports.CreateUsersTable1776687600000 = CreateUsersTable1776687600000;
//# sourceMappingURL=1776687600000-CreateUsersTable.js.map