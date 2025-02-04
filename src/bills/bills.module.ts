/**
 * @file This module defines the BillsModule for the ERP backend application.
 * It imports necessary modules, sets up the Mongoose schema for bills,
 * and provides the BillsController and BillsService for handling bill-related operations.
 * Additionally, it exports the BillsService for use in other modules.
 */

import { Module } from '@nestjs/common';
import { BillsController } from './bills.controller';
import { BillsService } from './bills.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BillSchema } from './infrastructure/persistance/document/schema/bill.schema'
import { LogsModule } from '../logs/logs.module';
import {DocumentBillersPersistenceModule} from './infrastructure/persistance/document/document-persistance.module'

@Module(
  {imports: [
      MongooseModule.forFeature([{ name: 'Bill', schema: BillSchema }]),
      LogsModule,
      DocumentBillersPersistenceModule
    ],
  controllers: [BillsController],
  providers: [BillsService],
  exports:[BillsService]
})
export class BillsModule {}
