import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/currency/convert/EUR/GBP/800')
      .expect(200)
      .expect({
        from: 'EUR',
        to: 'GBP',
        amount: 800,
        convertedAmount: 673.9200000000001,
        conversionRate: 0.8424,
      });
  });
});
