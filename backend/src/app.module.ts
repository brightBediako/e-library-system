import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'node:path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { BorrowModule } from './borrow/borrow.module';
import { ResourcesModule } from './resources/resources.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const e2eSqlite = configService.get<string>('E2E_SQLITE');
        if (e2eSqlite === 'true') {
          return {
            type: 'sqlite' as const,
            database: ':memory:',
            autoLoadEntities: true,
            synchronize: true,
          };
        }

        const devSqlite = configService.get<string>('DEV_SQLITE');
        if (devSqlite === 'true') {
          if (process.env.NODE_ENV === 'production') {
            throw new Error(
              'DEV_SQLITE is for local development only. Use PostgreSQL in production.',
            );
          }
          return {
            type: 'sqlite' as const,
            database: join(process.cwd(), 'dev.sqlite'),
            autoLoadEntities: true,
            synchronize: true,
          };
        }

        return {
          type: 'postgres' as const,
          host: configService.get<string>('DB_HOST', 'localhost'),
          port: Number(configService.get<string>('DB_PORT') ?? 5432),
          username: configService.get<string>('DB_USERNAME', 'postgres'),
          password: configService.get<string>('DB_PASSWORD', 'postgres'),
          database: configService.get<string>('DB_NAME', 'e_library_system'),
          autoLoadEntities: true,
          synchronize: false,
        };
      },
    }),
    AuthModule,
    UsersModule,
    BooksModule,
    BorrowModule,
    ResourcesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
