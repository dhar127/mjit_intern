import React from 'react';
import Swal from 'sweetalert2';

function List({ employees, handleEdit, handleDelete }) {
  const formatter = new Intl.NumberFormat('en-us', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 2,
  });

  const generatePaySlip = (employee) => {
    const basicSalary = employee.basicSalary;
    const hra = employee.hra;
    const grossSalary = employee.grossSalary;
    const netSalary = employee.netSalary;

    Swal.fire({
      icon: 'info',
      title: 'Pay Slip',
      html: `
        <p><strong>Basic Salary:</strong> ${formatter.format(basicSalary)}</p>
        <p><strong>HRA:</strong> ${formatter.format(hra)}</p>
        <p><strong>Other Allowances:</strong> ${formatter.format(employee.otherAllowances)}</p>
        <p><strong>Gross Salary:</strong> ${formatter.format(grossSalary)}</p>
        <p><strong>Net Salary:</strong> ${formatter.format(netSalary)}</p>
      `,
      showConfirmButton: true,
    });
  };

  return (
    <div className="overflow-x-auto w-screen">
      <table className="w-full border-collapse">
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="px-4 py-2 text-center">#</th>
            <th className="px-4 py-2 text-center">First Name</th>
            <th className="px-4 py-2 text-center">Last Name</th>
            <th className="px-4 py-2 text-center">Email</th>
            <th className="px-4 py-2 text-center">Basic Salary</th>
            
            <th className="px-4 py-2 text-center">Gross Salary</th>
            <th className="px-4 py-2 text-center">Net Salary</th>
            <th className="px-4 py-2 text-center">Date</th>
            <th className="px-4 py-2 col-span-2 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.length > 0 ? (
            employees.map((employee, i) => (
              <tr key={employee.id} className={i % 2 === 0 ? 'bg-white' : 'bg-gray-100'}>
                {/* ... (your existing table cells) */}
                <td className="border px-4 py-2 text-center">{i + 1}</td>
                <td className="border px-4 py-2 text-center">{employee.firstName}</td>
                <td className="border px-4 py-2 text-center">{employee.lastName}</td>
                <td className="border px-4 py-2 text-center">{employee.email}</td>
                <td className="border px-4 py-2 text-center">{formatter.format(employee.basicSalary)}</td>
                <td className="border px-4 py-2 text-center">{formatter.format(employee.grossSalary)}</td>
                <td className="border px-4 py-2 text-center">{formatter.format(employee.netSalary)}</td>
                <td className="border px-4 py-2 text-center">{employee.date}</td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleEdit(employee.id)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2 transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => handleDelete(employee.id)}
                  >
                    Delete
                  </button>
                </td>
                <td className="border px-4 py-2 text-center">
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
                    onClick={() => generatePaySlip(employee)}
                  >
                    Pay Slip
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td className="border px-4 py-2 col-span-11 text-center">No Employees</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default List;
