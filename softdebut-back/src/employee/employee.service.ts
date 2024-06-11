import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employee } from './employee.entity';
import { CreateEmployeeDto } from './employee.dto'; 

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
  ) {}

  async findAll(): Promise<Employee[]> {
    return this.employeeRepository.find();
  }

  async createEmployee(employee: CreateEmployeeDto): Promise<CreateEmployeeDto> {
    const existingEmployee = await this.employeeRepository.findOne({
      where: { EmpNum: employee.EmpNum },
    });
    if (existingEmployee) {
      throw new Error('Employee with this EmpNum already exists');
    }
    const hireDate = new Date().toISOString().split('T')[0];
    const newEmployee = { ...employee, HireDate: hireDate };
    return this.employeeRepository.save(newEmployee);
  }
}