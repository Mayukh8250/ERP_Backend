
/**
 * @file This module defines the TransactionModule for the ERP backend application.
 * 
 * The TransactionModule is responsible for managing transactions within the application.
 * It imports necessary modules such as BillsModule and MongooseModule with schemas for 
 * Transaction, Customer, and Biller models. The module also provides the TransactionService 
 * and repositories for handling transaction and biller data. Additionally, it exports 
 * the TransactionService and TransactionRepository for use in other parts of the application.
 * 
 * Controllers included in this module are BillsController and TransactionController.
 */

import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './infrastructure/persistance/transaction.repository';
import { TransactionDocumentRepository } from './infrastructure/persistance/document/repositories/transaction.repository'; // Make sure it's the correct file path
import { MongooseModule } from '@nestjs/mongoose';
import { Transaction, TransactionSchema } from './infrastructure/persistance/document/schema/transaction.schema';
import { BillerRepository } from '../biller/infrastructure/persistance/biller.repositories';
import { CustomerSchema ,Customer } from '../customer/insfrastructure/persistance/document/schema/customer.schema';
import { BillerSchema,Biller } from 'src/biller/infrastructure/persistance/document/schema/biller.schema';
import { BillsController } from 'src/bills/bills.controller';
import { TransactionController } from './transaction.controller';
import { BillsModule } from 'src/bills/bills.module'; 
import { BillerDocumentRepository } from 'src/biller/infrastructure/persistance/document/repositories/biller.repositories';

@Module({
  imports: [
    BillsModule,
    MongooseModule.forFeature([{ name: Transaction.name, schema: TransactionSchema }]),
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    MongooseModule.forFeature([{ name: Biller.name, schema: BillerSchema }]), // Add Biller model here
  ],
  providers: [
    TransactionService,
    { provide: TransactionRepository, useClass: TransactionDocumentRepository },
    { provide: BillerRepository, useClass: BillerDocumentRepository },
  ],
  controllers: [BillsController,TransactionController],
  exports: [TransactionService, TransactionRepository],
})
export class TransactionModule {}
