import React from 'react';
import { MdEdit, MdDelete } from 'react-icons/md';

function StaffTable({ staff, onDelete, onEdit }) {
  return (
    <div className="relative overflow-x-auto shadow-lg sm:rounded-lg bg-white">
      <table className="w-full text-sm text-left text-gray-600">
        <thead className="text-xs text-gray-700 uppercase bg-gray-100">
          <tr>
            <th scope="col" className="px-6 py-3">ID</th>
            <th scope="col" className="px-6 py-3">Name</th>
            <th scope="col" className="px-6 py-3">Email</th>
            <th scope="col" className="px-6 py-3">Phone</th>
            <th scope="col" className="px-6 py-3">Password</th>
            <th scope="col" className="px-6 py-3">NIC</th>
            <th scope="col" className="px-6 py-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {staff.map((member) => (
            <tr
              key={member.id}
              className="bg-white border-b hover:bg-gray-50"
            >
              <td className="px-6 py-4 text-gray-800 font-bold">{member.id}</td>
              <td className="px-6 py-4 text-gray-800 font-bold">{member.name}</td>
              <td className="px-6 py-4 text-gray-800 font-bold">{member.email}</td>
              <td className="px-6 py-4 text-gray-800 font-bold">{member.phone}</td>
              <td className="px-6 py-4 text-gray-800 font-bold">{member.password}</td>
              <td className="px-6 py-4 text-gray-800 font-bold">{member.nic}</td>
              <td className="px-6 py-4 flex space-x-2 text-gray-800 font-bold">
                <button
                  onClick={() => onEdit(member)}
                  className="text-blue-600 hover:text-blue-800"
                >
                  <MdEdit className="w-5 h-5" aria-hidden="true" />
                </button>
                <button
                  onClick={() => onDelete(member.id)}
                  className="text-red-600 hover:text-red-800"
                >
                  <MdDelete className="w-5 h-5" aria-hidden="true" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StaffTable;
