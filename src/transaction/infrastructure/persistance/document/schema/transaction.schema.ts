import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { Biller } from '../../../../../biller/infrastructure/persistance/document/schema/biller.schema';
import { Customer } from '../../../../../customer/insfrastructure/persistance/document/schema/customer.schema';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
    @Prop({ required: true })
    amount: number;

    @Prop({ default: Date.now })
    createdAt: Date;

    @Prop({ required: false })
    type: string;

    @Prop({ required: false })
    customerIdentifier:String;

    @Prop({ required: false })
    transactionRefId:String;

    @Prop({ required: false })
    refId:String;

    @Prop({ required: false })
    billerId:String;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Customer', required: true })
    customer: Customer;

    @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'Biller', required: true })
    biller: Biller;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
