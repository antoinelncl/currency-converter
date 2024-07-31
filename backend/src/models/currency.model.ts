import { IsDefined, IsNumber, IsString, Length } from 'class-validator';
import { Currency } from 'types/currency';

export class ConvertParams {
  @IsDefined()
  @IsString()
  @Length(3, 3)
  from: Currency;

  @IsDefined()
  @IsString()
  @Length(3, 3)
  to: Currency;

  @IsDefined()
  @IsNumber()
  amount: number;
}

export class ConvertResponse {
  @IsDefined()
  @IsNumber()
  conversionRate: number;
}
