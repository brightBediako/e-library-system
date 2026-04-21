import { DataSource } from 'typeorm';
export declare class AppService {
    private readonly dataSource;
    constructor(dataSource: DataSource);
    getHello(): string;
    getDatabaseHealth(): Promise<{
        status: string;
        database: string;
    }>;
}
