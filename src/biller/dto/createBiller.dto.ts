import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateBillerDto {
  @IsString()
  @IsNotEmpty()
  billerId: string;

  @IsString()
  @IsNotEmpty()
  billerName: string;

  @IsString()
  @IsNotEmpty()
  billerCategory: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  email: string;
  
}
