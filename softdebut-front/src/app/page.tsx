"use client"
import React , { useEffect, useState } from 'react';
import axios from 'axios';

export interface Employee {
  EmpNum: string;
  EmpName: string;
  HireDate: string;
  Salary: number;
  Position: string;
  DepNo: string;
  HeadNo: string;
}

interface AddEmployee {
  EmpNum: string;
  EmpName: string;
  Position: string;
}

export default function Home() {
  const [addemployee, setAddEmployee] = useState<AddEmployee>({ EmpNum: '', EmpName: '', Position: '' });
  const [employee, setEmployee] = useState<Employee | null>(null);

  useEffect(() => {
      axios.get('http://localhost:5000/employees')
          .then(response => {
              setEmployee(response.data);
          })
          .catch(error => {
              console.error('Error fetching employee data:', error);
          });
  }, []);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.currentTarget;
    setAddEmployee((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!addemployee.EmpNum) {
      alert('คุณยังไม่ได้กรอกรหัสพนักงาน');
      return;
    }
    if (!addemployee.EmpName) {
      alert('คุณยังไม่ได้กรอกชื่อพนักงาน');
      return;
    }
    if (!addemployee.Position) {
      alert('คุณยังไม่ได้เลือกตำแหน่งพนักงาน');
      return;
    }
    try {
      await axios.post('http://localhost:5000/employees', addemployee);
      alert('Employee added successfully');
      setAddEmployee({
        EmpNum: '',
        EmpName: '',
        Position: '',
      })    
    } catch (error) {
      console.error('Error adding employee:', error);
      alert('An error occurred while adding the employee. Please try again later.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#ECF8F8] font-prompt">
      <h1 className="text-2xl font-bold">Employee Information</h1>
      <div>
        <label htmlFor="empName" className="mt-4">First Employee Name : </label>
        <input
          type="text"
          id="empName"
          value={employee ? employee[0].EmpName : ''}
          readOnly
          className="mt-2 p-2 text-center border border-gray-300 rounded"
        />
      </div>
      <hr className="mb-14"/>
      <h2 className="text-xl font-bold mb-4">Add New Employee</h2>
      <form id="employeeForm" className="max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="EmpNum" className="block text-gray-700 mr-2">Employee Number : </label>
          <input type="text" id="EmpNum" name="EmpNum" value={addemployee.EmpNum} onChange={handleChange} className="mt-2 w-60 h-12 text-center border border-gray-300 rounded"/>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="EmpName" className="block text-gray-700 mr-2">Employee Name : </label>
          <input type="text" id="EmpName" name="EmpName" value={addemployee.EmpName} onChange={handleChange}  className="mt-2 w-60 h-12 text-center border border-gray-300 rounded"/>
        </div>
        <div className="mb-4 flex justify-between items-center">
          <label htmlFor="Position" className="block text-gray-700 mr-2">Position : </label>
          <select id="Position" name="Position" value={addemployee.Position} onChange={handleChange} className="mt-2 w-60 h-12 text-center border border-gray-300 rounded">
            <option value="">Select Position</option>
            <option value="Managing Director">Managing Director</option>
            <option value="Manager">Manager</option>
            <option value="Supervisor">Supervisor</option>
            <option value="Clerk">Clerk</option>
            <option value="Salesman">Salesman</option>
          </select>
        </div>
        <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Add Employee</button>
      </form>
    </div>
  );
}
