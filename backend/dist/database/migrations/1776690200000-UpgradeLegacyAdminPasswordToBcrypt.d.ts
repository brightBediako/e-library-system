import { MigrationInterface, QueryRunner } from 'typeorm';
export declare class UpgradeLegacyAdminPasswordToBcrypt1776690200000 implements MigrationInterface {
    name: string;
    up(queryRunner: QueryRunner): Promise<void>;
    down(_queryRunner: QueryRunner): Promise<void>;
}
