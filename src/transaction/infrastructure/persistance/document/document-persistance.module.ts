import { Module } from '@nestjs/common';
import { TransactionRepository } from '../transaction.repository';
import { TransactionDocumentRepository } from './repositories/transaction.repository';
import { TransactionSchema, TransactionDocument } from './schema/transaction.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Transaction",
        schema: TransactionSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: TransactionRepository,
      useClass: TransactionDocumentRepository,
    },
  ],
  exports: [TransactionRepository],
})
export class DocumentBillersPersistenceModule {}
