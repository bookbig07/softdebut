import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity()
export class Employee {
  @PrimaryColumn()
  EmpNum: string;

  @Column()
  EmpName: string;

  @Column()
  HireDate: string;

  @Column('decimal')
  Salary: number;

  @Column()
  Position: string;

  @Column()
  DepNo: string;

  @Column()
  HeadNo: string;
}
