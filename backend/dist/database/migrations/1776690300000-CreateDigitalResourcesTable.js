"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateDigitalResourcesTable1776690300000 = void 0;
const typeorm_1 = require("typeorm");
class CreateDigitalResourcesTable1776690300000 {
    name = 'CreateDigitalResourcesTable1776690300000';
    async up(queryRunner) {
        await queryRunner.createTable(new typeorm_1.Table({
            name: 'digital_resources',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '40',
                    isPrimary: true,
                },
                {
                    name: 'stored_filename',
                    type: 'varchar',
                    length: '255',
                    isUnique: true,
                    isNullable: false,
                },
                {
                    name: 'original_name',
                    type: 'varchar',
                    length: '255',
                    isNullable: false,
                },
                {
                    name: 'mimetype',
                    type: 'varchar',
                    length: '120',
                    isNullable: false,
                },
                {
                    name: 'size',
                    type: 'int',
                    isNullable: false,
                },
                {
                    name: 'access_tag',
                    type: 'varchar',
                    length: '20',
                    default: "'standard'",
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
        await queryRunner.dropTable('digital_resources');
    }
}
exports.CreateDigitalResourcesTable1776690300000 = CreateDigitalResourcesTable1776690300000;
//# sourceMappingURL=1776690300000-CreateDigitalResourcesTable.js.map