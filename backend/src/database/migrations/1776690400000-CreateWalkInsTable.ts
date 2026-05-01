import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateWalkInsTable1776690400000 implements MigrationInterface {
  name = 'CreateWalkInsTable1776690400000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
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
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('walk_ins');
  }
}
