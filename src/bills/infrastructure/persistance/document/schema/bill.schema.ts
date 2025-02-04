import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import {Customer} from '../../../../../customer/insfrastructure/persistance/document/schema/customer.schema'

export type BillDocument = Bill & Document;

@Schema()
export class Bill {

  @Prop({ required: true })
  billAmount: number;

  @Prop({ required: false })
  principleOs?: string;

  @Prop({ required: false })
  loanAmount?: string;

  @Prop({ required: false })
  emi?: string;

  @Prop({ required: false })
  billerId?: string;

  @Prop({ required: false })
  billNumber?: string;

  @Prop({ required: false })
  billDate?: string;

  @Prop({ required: false })
  dueDate?: string;

  @Prop({ required: false })
  billUpdatedOn?: string;

  @Prop({ required: false })
  billPeriod?: string;

  @Prop({ required: false })
  minAmount?: string;

  @Prop({ required: false })
  branchName?: string;

  @Prop({ required: false })
  loanDue?: string;

  @Prop({ required: false ,default: false})
  expired?: boolean;

  @Prop({ required: false, default: () => new Date().toISOString() })
  effectiveFrom: string;
  
  @Prop({ required: false })
  effectiveTo: String;

  @Prop({ type: String, ref: 'Customer' })
  customer: Customer;
  id: any;
}

export const BillSchema = SchemaFactory.createForClass(Bill);
