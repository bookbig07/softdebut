import { IsString } from 'class-validator';

export class CreateEmployeeDto {
  @IsString()
  EmpNum: string;

  @IsString()
  EmpName: string;

  @IsString()
  Position: string;
}