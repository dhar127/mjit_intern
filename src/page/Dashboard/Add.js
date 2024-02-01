import React, { useState, useRef, useEffect } from 'react';
import Swal from 'sweetalert2';

const HRA_PERCENTAGE = 0.30; // Assuming 30% HRA
const OTHER_ALLOWANCES = 1600; // Assuming a fixed other allowance

function Add({ employees, setEmployees, setIsAdding }) {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [salary, setSalary] = useState('');
  const [date, setDate] = useState('');
  const textInput = useRef(null);

  useEffect(() => {
    if (textInput.current) {
      textInput.current.focus();
    }
  },  []);

  const addEmployee = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  const calculateBasicSalary = () => {
    // Assuming basic salary is 70% of the total salary
    return parseFloat(salary) * 0.7;
  };

  const calculateHRA = () => {
    return calculateBasicSalary() * HRA_PERCENTAGE;
  };

  const calculateGrossSalary = () => {
    return calculateBasicSalary() + calculateHRA() + OTHER_ALLOWANCES;
  };

  const calculateNetSalary = () => {
    // Assuming net salary is 90% of the gross salary
    return calculateGrossSalary() * 0.9;
  };

  const handleAdd = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !salary || !date) {
      return Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'All fields are required.',
        showConfirmButton: true,
        timer: 1500,
      });
    }

    const id = employees.length + 1;
    const basicSalary = calculateBasicSalary();
    const hra = calculateHRA();
    const grossSalary = calculateGrossSalary();
    const netSalary = calculateNetSalary();

    const newEmployee = {
      id,
      firstName,
      lastName,
      email,
      salary,
      date,
      basicSalary,
      hra,
      grossSalary,
      netSalary,
    };

    addEmployee(newEmployee);

    setIsAdding(false);

    Swal.fire({
      icon: 'success',
      title: 'Added',
      text: `${firstName} ${lastName}'s data has been added`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const generatePaySlip = () => {
    const basicSalary = calculateBasicSalary();
    const hra = calculateHRA();
    const grossSalary = calculateGrossSalary();
    const netSalary = calculateNetSalary();

    Swal.fire({
      icon: 'info',
      title: 'Pay Slip',
      html: `
        <p><strong>Basic Salary:</strong> ₹${basicSalary.toFixed(2)}</p>
        <p><strong>HRA:</strong> ₹${hra.toFixed(2)}</p>
        <p><strong>Other Allowances:</strong> ₹${OTHER_ALLOWANCES.toFixed(2)}</p>
        <p><strong>Gross Salary:</strong> ₹${grossSalary.toFixed(2)}</p>
        <p><strong>Net Salary:</strong> ₹${netSalary.toFixed(2)}</p>
      `,
      showConfirmButton: true,
    });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-md shadow-md">
      <form onSubmit={handleAdd} className="space-y-4">
        <h1 className="text-2xl font-semibold mb-4">Add Employee</h1>
        {/* ... (your existing form inputs) */}
        <label htmlFor="firstName" className="block text-sm font-medium text-gray-600">
          First Name
        </label>
        <input
          id="firstName"
          type="text"
          name="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="border rounded-md p-2 w-full"
        />

        <label htmlFor="lastName" className="block text-sm font-medium text-gray-600">
          Last Name
        </label>
        <input
          id="lastName"
          type="text"
          name="lastName"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="border rounded-md p-2 w-full"
        />

        <label htmlFor="email" className="block text-sm font-medium text-gray-600">
          Email
        </label>
        <input
          id="email"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded-md p-2 w-full"
        />

        <label htmlFor="salary" className="block text-sm font-medium text-gray-600">
          Salary (₹)
        </label>
        <input
          id="salary"
          type="number"
          name="salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="border rounded-md p-2 w-full"
        />

        <label htmlFor="date" className="block text-sm font-medium text-gray-600">
          Date
        </label>
        <input
          id="date"
          type="date"
          name="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border rounded-md p-2 w-full"
        />

       
        
        <div className="mt-4 flex space-x-2">
          <input
            type="submit"
            value="Add"
            className="bg-blue-500 text-white rounded-md px-4 py-2 hover:bg-blue-600 cursor-pointer"
          />

          <button
            type="button"
            onClick={generatePaySlip}
            className="bg-green-500 text-white rounded-md px-4 py-2 hover:bg-green-600 cursor-pointer"
          >
            Generate Pay Slip
          </button>

          <input
            type="button"
            value="Cancel"
            onClick={() => setIsAdding(false)}
            className="bg-gray-300 text-gray-600 rounded-md px-4 py-2 hover:bg-gray-400 cursor-pointer"
          />
        </div>
      </form>
    </div>
  );
}

export default Add;
