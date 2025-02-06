import * as dotenv from 'dotenv';
dotenv.config();  // Ensure environment variables are loaded at the top

import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { BillerModule } from './biller/biller.module';
import { TransactionModule } from './transaction/transaction.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsModule } from './logs/logs.module';
import { BillsModule } from './bills/bills.module';
import { BullModule } from '@nestjs/bull';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGO_URL || ''),  // MongoDB connection URL
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST || 'localhost',  // Redis host from .env or default to localhost
        port:  6379,  // Redis port from .env or default to 6379
        password: process.env.REDIS_PASSWORD || '',  // Optional Redis password
      },
    }),
    CustomerModule, 
    BillerModule, 
    TransactionModule, 
    LogsModule, 
    BillsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
