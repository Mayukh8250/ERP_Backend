
/**
 * @file This module defines the BillerModule for the application.
 * It imports necessary modules and sets up the providers and controllers
 * required for the biller functionality.
 * 
 * The BillerModule includes:
 * - MongooseModule for integrating with MongoDB using the BillerSchema.
 * - LogsModule for logging functionalities.
 * - DocumentBillersPersistenceModule for handling persistence of biller documents.
 * 
 * The module provides the BillerService and BillerController, and exports the BillerService for use in other modules.
 */

import { Module } from '@nestjs/common';
import { BillerService } from './biller.service';
import { BillerController } from './biller.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { BillerSchema,Biller } from './infrastructure/persistance/document/schema/biller.schema';
import { LogsModule } from '../logs/logs.module';
import { DocumentBillersPersistenceModule } from './infrastructure/persistance/document/document-persistance.module';  // Import the DocumentBillersPersistenceModule

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Biller.name, schema: BillerSchema }]),
    LogsModule,
    DocumentBillersPersistenceModule,  
  ],
  providers: [BillerService],
  controllers: [BillerController],
  exports: [BillerService],
})
export class BillerModule {}
