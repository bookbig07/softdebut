import { Controller, Get, Post, Body, BadRequestException } from '@nestjs/common';
import { EmployeeService } from './employee.service';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './employee.dto'; 

@Controller('employees')
export class EmployeeController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get()
  async getEmployees(): Promise<Employee[]> {
    return this.employeeService.findAll();
  }

  @Post()
  async createEmployee(@Body() employee: CreateEmployeeDto): Promise<CreateEmployeeDto> {
    try {
      return await this.employeeService.createEmployee(employee);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}