import { IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class FilterCustomerDto {
    @IsString()
    @IsOptional()
    billerId: string;

    @IsString()
    @IsOptional()
    customerName?: String;
    

}