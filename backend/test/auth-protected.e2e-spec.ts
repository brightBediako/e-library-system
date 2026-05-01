import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { UserEntity } from '../src/users/user.entity';

describe('Auth & protected routes (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    const dataSource = app.get(DataSource);
    const usersRepo = dataSource.getRepository(UserEntity);

    await usersRepo.save({
      id: 'e2e-admin-001',
      fullName: 'E2E Admin',
      email: 'admin@e2e.test',
      passwordHash: await bcrypt.hash('Pass123!', 10),
      role: 'admin',
    });
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  it('POST /auth/login rejects invalid credentials', async () => {
    await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@e2e.test', password: 'wrong' })
      .expect(401);
  });

  it('POST /auth/login returns JWT for valid credentials', async () => {
    const response = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@e2e.test', password: 'Pass123!' })
      .expect(200);

    expect(response.body.access_token).toBeDefined();
    expect(typeof response.body.access_token).toBe('string');
    expect(response.body.user?.email).toBe('admin@e2e.test');
    expect(response.body.user?.role).toBe('admin');
  });

  it('GET /books returns 401 without Authorization', async () => {
    await request(app.getHttpServer()).get('/books').expect(401);
  });

  it('GET /books returns 200 with Bearer token', async () => {
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'admin@e2e.test', password: 'Pass123!' })
      .expect(200);

    const token = login.body.access_token as string;

    const booksResponse = await request(app.getHttpServer())
      .get('/books')
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    expect(Array.isArray(booksResponse.body)).toBe(true);
  });
});
