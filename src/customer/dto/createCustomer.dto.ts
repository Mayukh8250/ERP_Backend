import { IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class CreateCustomerDto {
    @IsString()
    @IsNotEmpty()
    customerName: string;
    
    @IsString()
    @IsNotEmpty()
    billAmount: number;
    
    @IsString()
    @IsNotEmpty()
    customerIdentifier: string;
    
    @IsString()
    @IsOptional()
    principleOs: String;

    @IsString()
    @IsOptional()
    loanAmount: String;

    @IsString()
    @IsOptional()
    emi: String;

    @IsString()
    @IsOptional()
    billerId: String;

    @IsString()
    @IsOptional()
    billNumber: String;

    @IsString()
    @IsOptional()
    billDate: String;

    @IsString()
    @IsOptional()
    dueDate: String;

    @IsString()
    @IsOptional()
    billUpdateOn: String;

    @IsString()
    @IsOptional()
    billPeriod: String;

    @IsString()
    @IsOptional()
    loanDue: String;

    @IsString()
    @IsOptional()
    minAmount: String;

    @IsString()
    @IsOptional()
    branchName: String;
 }
