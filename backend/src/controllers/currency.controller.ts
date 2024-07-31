import { Controller, Get, Param } from '@nestjs/common';
import { CurrencyService } from '../services/currency.service';
import { Currency } from 'types/currency';
import { ConvertResponse } from 'src/models/currency.model';

@Controller('currency')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Get('convert/:from/:to')
  async getConvert(
    @Param('from') from: Currency,
    @Param('to') to: Currency,
  ): Promise<ConvertResponse> {
    return await this.currencyService.getConvert(from, to);
  }
}
