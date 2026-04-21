"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBorrowsTable1776690000000 = void 0;
const typeorm_1 = require("typeorm");
class CreateBorrowsTable1776690000000 {
    name = 'CreateBorrowsTable1776690000000';
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'borrows',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '40',
                    isPrimary: true,
                },
                {
                    name: 'user_id',
                    type: 'varchar',
                    length: '40',
                    isNullable: false,
                },
                {
                    name: 'book_id',
                    type: 'varchar',
                    length: '40',
                    isNullable: false,
                },
                {
                    name: 'borrowed_at',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'due_date',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'returned_at',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                    length: '20',
                    default: "'active'",
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
        await queryRunner.createForeignKey('borrows', new typeorm_1.TableForeignKey({
            columnNames: ['user_id'],
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
        await queryRunner.createForeignKey('borrows', new typeorm_1.TableForeignKey({
            columnNames: ['book_id'],
            referencedTableName: 'books',
            referencedColumnNames: ['id'],
            onDelete: 'CASCADE',
        }));
    }
    async down(queryRunner) {
        const table = await queryRunner.getTable('borrows');
        if (table) {
            for (const fk of table.foreignKeys) {
                await queryRunner.dropForeignKey('borrows', fk);
            }
        }
        await queryRunner.dropTable('borrows');
    }
}
exports.CreateBorrowsTable1776690000000 = CreateBorrowsTable1776690000000;
//# sourceMappingURL=1776690000000-CreateBorrowsTable.js.map