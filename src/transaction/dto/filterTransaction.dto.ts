import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class FilterTransactionDto {

    @IsOptional()
    @IsString()
    type: string;

    @IsOptional()
    @IsString()
    customerIdentifier: string;

    @IsNotEmpty()
    @IsString()
    billerId: string;

}
