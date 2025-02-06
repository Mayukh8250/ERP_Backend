import { Module } from '@nestjs/common';
import { CustomerService } from './customer.service';
import { CustomerController } from './customer.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerSchema, Customer } from './insfrastructure/persistance/document/schema/customer.schema';
import { CustomerUploadService } from './customerUpload.service';
import { BillsModule } from '../bills/bills.module';
import { BillSchema, Bill } from '../bills/infrastructure/persistance/document/schema/bill.schema';
import { LogsModule } from '../logs/logs.module';
import { CustomerRepository } from './insfrastructure/persistance/customer.repositories';
import { CustomerDocumentRepository } from './insfrastructure/persistance/document/repositories/customer.repositories';
import { BullModule } from '@nestjs/bull';  // Import BullModule
import { CustomerUploadProcessor } from './queue/consumer/customer-upload.processor';  // Import the processor

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Customer.name, schema: CustomerSchema }]),
    MongooseModule.forFeature([{ name: Bill.name, schema: BillSchema }]),
    BillsModule,
    LogsModule,
    BullModule.registerQueue({  // Register the Bull queue
      name: 'customer-upload',
    }),
  ],
  providers: [
    CustomerService,
    CustomerUploadService,
    {
      provide: CustomerRepository,
      useClass: CustomerDocumentRepository, // ✅ Binding repository interface to the document implementation
    },
    CustomerUploadProcessor,  // Add the processor as a provider to handle background jobs
  ],
  controllers: [CustomerController],
  exports: [CustomerService, CustomerUploadService, CustomerRepository],
})
export class CustomerModule {}
