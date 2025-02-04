import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BillerDocument = Biller & Document;

@Schema()
export class Biller {
@Prop({ required: true, unique: true })
billerId: string;

@Prop({ required: true, unique: true })
email: string;

@Prop({ required: true })
billerName: string;

@Prop({ required: true })
billerCategory: string;

@Prop({ required: true })
password:string;
}

export const BillerSchema = SchemaFactory.createForClass(Biller);