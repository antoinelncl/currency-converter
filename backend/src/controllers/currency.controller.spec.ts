import { Test, TestingModule } from '@nestjs/testing';
import { CurrencyController } from './currency.controller';
import { CurrencyService } from '../services/currency.service';
import { Currency } from 'types/currency';
import { ConvertResponse } from 'src/models/currency.model';

describe('CurrencyController', () => {
  let currencyController: CurrencyController;
  let currencyService: CurrencyService;

  beforeEach(async () => {
    const mockCurrencyService = {
      getConvert: jest.fn().mockResolvedValue({
        conversionRate: 0.85,
      }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CurrencyController],
      providers: [
        {
          provide: CurrencyService,
          useValue: mockCurrencyService,
        },
      ],
    }).compile();

    currencyController = module.get<CurrencyController>(CurrencyController);
    currencyService = module.get<CurrencyService>(CurrencyService);
  });

  it('should be defined', () => {
    expect(currencyController).toBeDefined();
  });

  describe('getConvert', () => {
    it('should call currencyService.getConvert and return the result', async () => {
      const from: Currency = 'USD';
      const to: Currency = 'EUR';
      const result: ConvertResponse = {
        conversionRate: 0.85,
      };

      const response = await currencyController.getConvert(from, to);
      expect(response).toEqual(result);
      expect(currencyService.getConvert).toHaveBeenCalledWith(from, to);
    });
  });
});
