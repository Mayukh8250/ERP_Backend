import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Bill } from '../../../../../bills/infrastructure/persistance/document/schema/bill.schema';

export type CustomerDocument = Customer & Document;

@Schema()
export class Customer {
  @Prop({ required: true })
  customerName: string;

  @Prop({ required: true, unique: true })
  customerIdentifier: string;

  @Prop({ required: false })
  billerId: String;

  @Prop({ type: [{ type: MongooseSchema.Types.ObjectId, ref: 'Bill' }] })
  bills: Bill[];
  id: any;
}

export const CustomerSchema = SchemaFactory.createForClass(Customer);
