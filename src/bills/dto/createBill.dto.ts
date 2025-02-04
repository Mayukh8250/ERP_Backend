import { IsString, IsNotEmpty, IsOptional} from 'class-validator';

export class CreateBillDto {

    @IsString()
    @IsNotEmpty()
    billAmount: number;
    
    
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

    @IsString()
    @IsOptional()
    customer:String;

    @IsString()
    @IsOptional()
    billUpdatedOn: String;

    @IsString()
    @IsOptional()
    expired: Boolean;

    @IsString()
    @IsOptional()
    effectiveTo: String;
  id: any;
 }
