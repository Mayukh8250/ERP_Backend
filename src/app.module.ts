import * as dotenv from 'dotenv';
dotenv.config();  // Make sure this is at the very top
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomerModule } from './customer/customer.module';
import { BillerModule } from './biller/biller.module';
import { TransactionModule } from './transaction/transaction.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsModule } from './logs/logs.module';
import { BillsModule } from './bills/bills.module';


@Module({
  imports: [
    MongooseModule.forRoot(
      //'mongodb+srv://mayukh:1Singleshot@cluster0.wwbnx.mongodb.net/mydatabase',
      process.env.MONGO_URL || ''
  ),
  CustomerModule, 
  BillerModule, 
  TransactionModule, 
  LogsModule, 
  BillsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
