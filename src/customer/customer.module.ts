/**
 * @file This module defines the CustomerModule for the application.
 * It imports necessary modules and schemas, provides services and repositories,
 * and exports services and repositories for use in other modules.
 * 
 * The module integrates with Mongoose for MongoDB interactions, 
 * and includes dependencies on BillsModule and LogsModule.
 * 
 * @module CustomerModule
 */

import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema ,Customer} from './insfrastructure/persistance/document/schema/customer.schema';
import { CustomerUploadService } from './customerUpload.service';
import { BillsModule } from '../bills/bills.module';
import { BillSchema, Bill } from '../bills/infrastructure/persistance/document/schema/bill.schema';
import { LogsModule } from '../logs/logs.module';
import { CustomerRepository } from './insfrastructure/persistance/customer.repositories';
import { CustomerDocumentRepository } from './insfrastructure/persistance/document/repositories/customer.repositories';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }]),
    BillsModule,
    LogsModule
  ],
  providers: [
    CustomerService,
    CustomerUploadService,
    {
      provide: CustomerRepository,
      useClass: CustomerDocumentRepository, // ✅ Binding repository interface to the document implementation
    }
  ],
  controllers: [CustomerController],
  exports: [CustomerService, CustomerUploadService, CustomerRepository], // ✅ Export for use in other modules
})
export class CustomerModule {}
