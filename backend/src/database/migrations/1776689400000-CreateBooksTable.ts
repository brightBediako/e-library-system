import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBooksTable1776689400000 implements MigrationInterface {
  name = 'CreateBooksTable1776689400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('books');
  }
}
