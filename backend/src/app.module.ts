import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BooksModule } from './books/books.module';
import { BorrowModule } from './borrow/borrow.module';
import { ResourcesModule } from './resources/resources.module';
import { UsersModule } from './users/users.module';
import { WalkInsModule } from './walk-ins/walk-ins.module';

const requireConfig = (
  configService: ConfigService,
  key: 'DB_HOST' | 'DB_PORT' | 'DB_USERNAME' | 'DB_PASSWORD' | 'DB_NAME',
) => {
  const value = configService.get<string>(key)?.trim();
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}. Update backend/.env with PostgreSQL settings.`,
    );
  }
  return value;
};

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

        const host = requireConfig(configService, 'DB_HOST');
        const portRaw = requireConfig(configService, 'DB_PORT');
        const username = requireConfig(configService, 'DB_USERNAME');
        const password = requireConfig(configService, 'DB_PASSWORD');
        const database = requireConfig(configService, 'DB_NAME');
        const port = Number(portRaw);

        if (Number.isNaN(port) || port <= 0) {
          throw new Error(
            `Invalid DB_PORT value "${portRaw}". Set a valid PostgreSQL port number in backend/.env.`,
          );
        }

        return {
          type: 'postgres' as const,
          host,
          port,
          username,
          password,
          database,
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
    WalkInsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
