import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { Currency } from 'types/currency';
import { ConvertResponse } from 'src/models/currency.model';

@Injectable()
export class CurrencyService {
  constructor(
    private httpClient: HttpService,
    private configService: ConfigService,
  ) {}

  async getConvert(
    from: Currency,
    to: Currency,
    amount: number,
  ): Promise<ConvertResponse> {
    const apiKey = this.configService.get('EXCHANGERATE_API_KEY');
    const url = this.configService.get('EXCHANGERATE_API_URL');

    const response = await firstValueFrom(
      this.httpClient.get(`${url}/${apiKey}/pair/${from}/${to}`).pipe(),
    );

    return {
      from,
      to,
      amount,
      converted_amount: amount * response.data['conversion_rate'],
      conversion_rate: response.data['conversion_rate'],
    };
  }
}
