import React, { useState, useEffect } from 'react';
import axios from 'axios';
import StaffTable from '../../../components/StaffTable';
import { toast } from 'react-toastify';
function AllStaff() {
  const [staff, setStaff] = useState([]);
  const [editStaff, setEditStaff] = useState(null);
  const [updatedName, setUpdatedName] = useState('');
  const [updatedEmail, setUpdatedEmail] = useState('');
  const [updatedPhone, setUpdatedPhone] = useState('');
  const [updatedPassword, setUpdatedPassword] = useState('');
  const [updatedNic, setUpdatedNic] = useState('');
  const [error, setError] = useState('');
  

  useEffect(() => {
    fetchStaff();
  }, []);

  const fetchStaff = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/staff');
      setStaff(response.data);
      
    } catch (error) {
      console.error('Failed to fetch staff:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/staff/${id}`);
      fetchStaff();
      toast.success('Staff member deleted successfully!');
    } catch (error) {
      console.error('Failed to delete staff:', error);
    }
  };

  const handleUpdate = (staffMember) => {
    setEditStaff(staffMember);
    setUpdatedName(staffMember.name);
    setUpdatedEmail(staffMember.email);
    setUpdatedPhone(staffMember.phone);
    setUpdatedPassword(staffMember.password);
    setUpdatedNic(staffMember.nic);
  };

  const handleSubmitUpdate = async (e) => {
    e.preventDefault();
    setError('');
    if (!updatedName || !updatedEmail || !updatedPhone || !updatedPassword || !updatedNic) {
      setError('All fields are required');
      return;
    }
    try {
      const updatedData = {
        name: updatedName,
        email: updatedEmail,
        phone: updatedPhone,
        password: updatedPassword,
        nic: updatedNic
      };
      await axios.put(`http://localhost:8081/api/staff/${editStaff.id}`, updatedData);
      fetchStaff();
      setEditStaff(null);
      toast.success('Staff member updated successfully!');
    } catch (error) {
      setError('Failed to update staff');
      console.error('Failed to update staff:', error);
    }
  };

  return (
    <div className="flex flex-col w-full gap-5 mx-auto">
      <nav className="my-2">
        <ol className="flex text-[#ff2626]">
          
          <li className="text-3xl font-semibold text-gray-900 mb-6">
            <span>Staff </span>
          </li>
        </ol>
      </nav>
      <hr />
      <a href="/create-staff">
        <button
          type="button"
          className="text-white bg-[#360909]  flex items-center gap-2 hover:bg-[#0e2139] font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
        >
         
          Create Staff
        </button>
      </a>
      <div>
        <StaffTable
          staff={staff}
          onDelete={handleDelete}
          onEdit={handleUpdate}
        />
      </div>

      {/* Update Form */}
      {editStaff && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="bg-white p-6 border border-gray-200 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Update Staff</h3>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <form onSubmit={handleSubmitUpdate}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={updatedName}
                  onChange={(e) => setUpdatedName(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={updatedEmail}
                  onChange={(e) => setUpdatedEmail(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Phone</label>
                <input
                  type="text"
                  value={updatedPhone}
                  onChange={(e) => setUpdatedPhone(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Password</label>
                <input
                  type="password"
                  value={updatedPassword}
                  onChange={(e) => setUpdatedPassword(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">NIC</label>
                <input
                  type="text"
                  value={updatedNic}
                  onChange={(e) => setUpdatedNic(e.target.value)}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                />
              </div>
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 text-white bg-blue-600 hover:bg-blue-700 rounded-md px-4 py-2"
                >
                  Update
                </button>
                <button
                  type="button"
                  onClick={() => setEditStaff(null)}
                  className="flex-1 text-white bg-red-600 hover:bg-red-700 rounded-md px-4 py-2"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AllStaff;
