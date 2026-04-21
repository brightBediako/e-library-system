import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class CreateBooksTable1776689400000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(queryRunner: QueryRunner): Promise<void>;
}
