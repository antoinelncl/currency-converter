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

  @IsDefined()
  @IsNumber()
  converted_amount: number;

  @IsDefined()
  @IsNumber()
  conversion_rate: number;
}
