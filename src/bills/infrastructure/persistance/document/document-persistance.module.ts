import { Module } from '@nestjs/common';
import { BillRepository } from '../bill.repositories';
import { BillDocumentRepository } from './repositories/bill.repositories';
import { BillDocument, BillSchema } from './schema/bill.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Bill",
        schema: BillSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: BillRepository,
      useClass: BillDocumentRepository,
    },
  ],
  exports: [BillRepository],
})
export class DocumentBillersPersistenceModule {}
