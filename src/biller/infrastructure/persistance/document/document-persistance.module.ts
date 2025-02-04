import { Module } from '@nestjs/common';
import { BillerRepository } from '../biller.repositories';
import { BillerDocumentRepository } from '../document/repositories/biller.repositories';
import { BillerDocument, BillerSchema } from '../document/schema/biller.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: "Biller",
        schema: BillerSchema,
      },
    ]),
  ],
  providers: [
    {
      provide: BillerRepository,
      useClass: BillerDocumentRepository,
    },
  ],
  exports: [BillerRepository],
})
export class DocumentBillersPersistenceModule {}
