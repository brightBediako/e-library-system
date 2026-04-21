"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateBooksTable1776689400000 = void 0;
const typeorm_1 = require("typeorm");
class CreateBooksTable1776689400000 {
    name = 'CreateBooksTable1776689400000';
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'books',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '40',
                    isPrimary: true,
                },
                {
                    name: 'title',
                    type: 'varchar',
                    length: '200',
                    isNullable: false,
                },
                {
                    name: 'author',
                    type: 'varchar',
                    length: '150',
                    isNullable: false,
                },
                {
                    name: 'isbn',
                    type: 'varchar',
                    length: '32',
                    isNullable: false,
                    isUnique: true,
                },
                {
                    name: 'book_type',
                    type: 'varchar',
                    length: '20',
                    default: "'physical'",
                    isNullable: false,
                },
                {
                    name: 'storage',
                    type: 'varchar',
                    length: '255',
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
        await queryRunner.dropTable('books');
    }
}
exports.CreateBooksTable1776689400000 = CreateBooksTable1776689400000;
//# sourceMappingURL=1776689400000-CreateBooksTable.js.map