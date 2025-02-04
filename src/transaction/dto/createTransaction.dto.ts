import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreateTransactionDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    @IsString()
    type: string;

    @IsNotEmpty()
    @IsString()
    customerIdentifier: string;

    @IsNotEmpty()
    @IsString()
    billerId: string;

    @IsNotEmpty()
    @IsString()
    transactionRefId:String;

    @IsNotEmpty()
    @IsString()
    refId:String;

    @IsNotEmpty()
    @IsString()
    biller:Object

    @IsNotEmpty()
    @IsString()
    customer:Object
}
