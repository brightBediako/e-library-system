import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateDigitalResourcesTable1776690300000 implements MigrationInterface {
  name = 'CreateDigitalResourcesTable1776690300000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('digital_resources');
  }
}
