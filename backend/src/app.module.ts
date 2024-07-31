import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from './services/currency.service';

@Module({
  imports: [
    HttpModule.register({
      maxRedirects: 5,
      timeout: 5000,
    }),
    ConfigModule.forRoot({
      envFilePath: ['.env'],
    }),
  ],
  controllers: [CurrencyController],
  providers: [CurrencyService],
})
export class AppModule {}
