"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateWalkInsTable1776690400000 = void 0;
const typeorm_1 = require("typeorm");
class CreateWalkInsTable1776690400000 {
    name = 'CreateWalkInsTable1776690400000';
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'walk_ins',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '40',
                    isPrimary: true,
                },
                {
                    name: 'student_name',
                    type: 'varchar',
                    length: '150',
                    isNullable: false,
                },
                {
                    name: 'index_no',
                    type: 'varchar',
                    length: '60',
                    isNullable: false,
                },
                {
                    name: 'class_name',
                    type: 'varchar',
                    length: '80',
                    isNullable: false,
                },
                {
                    name: 'time_in',
                    type: 'timestamp',
                    isNullable: false,
                },
                {
                    name: 'time_out',
                    type: 'timestamp',
                    isNullable: true,
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
        await queryRunner.dropTable('walk_ins');
    }
}
exports.CreateWalkInsTable1776690400000 = CreateWalkInsTable1776690400000;
//# sourceMappingURL=1776690400000-CreateWalkInsTable.js.map