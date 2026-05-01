import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import * as bcrypt from 'bcryptjs';
import request from 'supertest';
import { DataSource } from 'typeorm';
import { AppModule } from '../src/app.module';
import { UserEntity } from '../src/users/user.entity';

describe('Walk-ins (e2e)', () => {
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
      id: 'e2e-librarian-001',
      fullName: 'E2E Librarian',
      email: 'librarian@e2e.test',
      passwordHash: await bcrypt.hash('Pass123!', 10),
      role: 'librarian',
    });
  });

  afterEach(async () => {
    if (app) {
      await app.close();
    }
  });

  const loginAndGetToken = async () => {
    const login = await request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'librarian@e2e.test', password: 'Pass123!' })
      .expect(200);

    return login.body.access_token as string;
  };

  it('blocks duplicate active walk-in for same index number', async () => {
    const token = await loginAndGetToken();

    await request(app.getHttpServer())
      .post('/walk-ins/check-in')
      .set('Authorization', `Bearer ${token}`)
      .send({
        studentName: 'Ama Boateng',
        indexNo: 'SHS-001',
        className: 'Form 2A',
      })
      .expect(201);

    await request(app.getHttpServer())
      .post('/walk-ins/check-in')
      .set('Authorization', `Bearer ${token}`)
      .send({
        studentName: 'Ama Boateng',
        indexNo: 'SHS-001',
        className: 'Form 2A',
      })
      .expect(400);
  });

  it('blocks check-out when session is already closed', async () => {
    const token = await loginAndGetToken();

    const checkIn = await request(app.getHttpServer())
      .post('/walk-ins/check-in')
      .set('Authorization', `Bearer ${token}`)
      .send({
        studentName: 'Kwame Mensah',
        indexNo: 'SHS-101',
        className: 'Form 3B',
      })
      .expect(201);

    const walkInId = checkIn.body.id as string;

    await request(app.getHttpServer())
      .patch(`/walk-ins/${encodeURIComponent(walkInId)}/check-out`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200);

    await request(app.getHttpServer())
      .patch(`/walk-ins/${encodeURIComponent(walkInId)}/check-out`)
      .set('Authorization', `Bearer ${token}`)
      .expect(400);
  });
});
