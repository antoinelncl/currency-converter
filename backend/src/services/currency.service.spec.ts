import { Test, TestingModule } from '@nestjs/testing';
import { HttpService } from '@nestjs/axios';
import { of } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { CurrencyService } from './currency.service';
import { ConvertResponse } from 'src/models/currency.model';
import { Currency } from 'types/currency';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpService: HttpService;
  let configService: ConfigService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CurrencyService,
        {
          provide: HttpService,
          useValue: {
            get: jest.fn().mockReturnValue(
              of({
                data: {
                  conversion_rate: 0.85,
                },
              }),
            ),
          },
        },
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => {
              if (key === 'EXCHANGERATE_API_KEY') return 'test-api-key';
              if (key === 'EXCHANGERATE_API_URL')
                return 'https://api.exchangerate-api.com';
              return null;
            },
          },
        },
      ],
    }).compile();

    service = module.get<CurrencyService>(CurrencyService);
    httpService = module.get<HttpService>(HttpService);
    configService = module.get<ConfigService>(ConfigService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should initialize httpClient', () => {
    expect(service['httpClient']).toBe(httpService);
  });

  it('should initialize configService', () => {
    expect(service['configService']).toBe(configService);
  });

  describe('getConvert', () => {
    it('should return a ConvertResponse', async () => {
      const from: Currency = 'USD';
      const to: Currency = 'EUR';

      const result: ConvertResponse = await service.getConvert(from, to);

      expect(result).toEqual({
        conversionRate: 0.85,
      });
    });
  });
});
