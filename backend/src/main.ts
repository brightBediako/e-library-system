import { Logger } from '@nestjs/common';
import { mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';

async function bootstrap() {
  const uploadsResourcesDir = join(process.cwd(), 'uploads', 'resources');
  mkdirSync(uploadsResourcesDir, { recursive: true });

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  /** localhost / 127.0.0.1 / ::1 — allowed always so local dev works even when NODE_ENV=production. */
  const localBrowserOrigin =
    /^https?:\/\/(localhost|127\.0\.0\.1|\[::1\])(:\d+)?$/i;

  const nodeEnv = process.env.NODE_ENV ?? 'development';

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin) {
        callback(null, true);
        return;
      }
      if (localBrowserOrigin.test(origin)) {
        callback(null, true);
        return;
      }
      if (nodeEnv !== 'production') {
        callback(null, true);
        return;
      }
      const explicit = (process.env.CORS_ORIGINS ?? '')
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      callback(null, explicit.includes(origin));
    },
    credentials: true,
    methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    maxAge: 86400,
  });

  const port = Number(process.env.PORT ?? 3001);
  const host = process.env.HOST ?? '0.0.0.0';

  await app.listen(port, host);
  const label = host === '0.0.0.0' ? 'localhost' : host;
  new Logger('NestApplication').log(`Listening at http://${label}:${port}`);
}
bootstrap();
