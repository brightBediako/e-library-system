import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateBorrowsTable1776690000000 implements MigrationInterface {
  name = 'CreateBorrowsTable1776690000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true,
    );

    await queryRunner.createForeignKey(
      'borrows',
      new TableForeignKey({
        columnNames: ['user_id'],
        referencedTableName: 'users',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );

    await queryRunner.createForeignKey(
      'borrows',
      new TableForeignKey({
        columnNames: ['book_id'],
        referencedTableName: 'books',
        referencedColumnNames: ['id'],
        onDelete: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const table = await queryRunner.getTable('borrows');
    if (table) {
      for (const fk of table.foreignKeys) {
        await queryRunner.dropForeignKey('borrows', fk);
      }
    }
    await queryRunner.dropTable('borrows');
  }
}
