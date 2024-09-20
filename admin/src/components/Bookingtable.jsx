import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash, FaTimes } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const BookingTable = () => {
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    address: '',
    phone: '',
    dateOfBirth: '',
    bookingTime: '',
    persons: '',
    message: '',
    specialRequests: '',
    status: ''
  });

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await axios.get('http://localhost:8081/api/bookings');
      setBookings(response.data);
    } catch (error) {
      toast.error('Error fetching bookings.');
    }
  };

  const handleEdit = (booking) => {
    setSelectedBooking(booking);
    setFormData({ ...booking });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      const formattedData = {
        ...formData,
        bookingTime: new Date(formData.bookingTime).toISOString(), // Ensure correct format
        dateOfBirth: new Date(formData.dateOfBirth).toISOString() // Ensure correct format
      };

      await axios.put(`http://localhost:8081/api/bookings/${formData.id}`, formattedData);
      setIsModalOpen(false);
      fetchBookings();
      toast.success('Booking updated successfully.');
    } catch (error) {
      console.error('Error updating booking:', error); // Log the error
      toast.error('Error updating booking.');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8081/api/bookings/${id}`);
      setBookings(bookings.filter(booking => booking.id !== id));
      toast.success('Booking deleted successfully.');
    } catch (error) {
      toast.error('Error deleting booking.');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [name]: value
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      
      case 'CONFIRMED':
        return 'text-yellow-500 text-white';
      case 'PENDING':
        return ' text-blue-700  ';
      case 'CANCELLED':
        return 'text-red-500  ';
        case 'COMPLETED':
          return 'text-green-500 ';
      default:
        return 'text-red-500  text-white';
    }
  };
  const countStatus = (status) => bookings.filter(booking => booking.status === status).length;
  return (
    <div className="overflow-x-auto  bg-white p-8 rounded-lg shadow-lg">
       <h2 className="text-2xl font-semibold mb-6">Booking Dashboard</h2>
      <div className="grid grid-cols-4 gap-6 mb-6">
        <div className="p-4 bg-yellow-500 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Confirmed</h3>
          <p className="text-2xl">{countStatus('CONFIRMED')}</p>
        </div>
        <div className="p-4 bg-blue-500 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Pending</h3>
          <p className="text-2xl">{countStatus('PENDING')}</p>
        </div>
        <div className="p-4 bg-red-500 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Cancelled</h3>
          <p className="text-2xl">{countStatus('CANCELLED')}</p>
        </div>
        <div className="p-4 bg-green-500 text-white rounded-lg shadow-md">
          <h3 className="text-lg font-semibold">Completed</h3>
          <p className="text-2xl">{countStatus('COMPLETED')}</p>
        </div>
      </div>
      <h2 className="text-2xl font-semibold mb-6">Booking Table</h2>
      <table className="w-full  text-sm text-left text-gray-600 border-collapse">
      <thead className="text-xs  w-full  text-gray-700 uppercase bg-gray-100">
          <tr>
            <th className="py-3 px-4 border-b">ID</th>
            <th className="py-3 px-4 border-b">Name</th>
            <th className="py-3 px-4 border-b">Email</th>
            <th className="py-3 px-4 border-b">Address</th>
            <th className="py-3 px-4 border-b">Phone</th>
            <th className="py-3 px-4 border-b">Date of Birth</th>
            <th className="py-3 px-4 border-b"> Booking Date & Time</th>
            <th className="py-3 px-4 border-b">Persons</th>
            <th className="py-3 px-4 border-b">Message</th>
            <th className="py-3 px-4 border-b">Special Requests</th>
            <th className="py-3 px-4 border-b ">Status</th>
            <th className="py-3 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody >
          {bookings.map((booking) => (
            <tr key={booking.id} className=''>
              <td className="py-4 px-4 font-medium border-b">{booking.id}</td>
              <td className="py-4 px-4 font-medium border-b">{booking.name}</td>
              <td className="py-4 px-4 font-medium border-b">{booking.email}</td>
              <td className="py-4 px-4 font-medium border-b">{booking.address}</td>
              <td className="py-4 px-4 font-medium border-b">{booking.phone}</td>
              <td className="py-4 px-4 font-medium border-b">{new Date(booking.dateOfBirth).toLocaleDateString()}</td>
              <td className="py-4 px-4 font-medium border-b">{new Date(booking.bookingTime).toLocaleString()}</td>
              <td className="py-4 px-4 font-medium border-b">{booking.persons}</td>
              <td className="py-4 px-4 font-medium border-b">{booking.message}</td>
              <td className="py-4 px-4   font-medium border-b">{booking.specialRequests}</td>
              <td className={`py-4 px-4  font-medium    border-b ${getStatusColor(booking.status)}`}>
  {booking.status}
</td>
              <td className="py-4 px-4 font-medium border-b  space-x-2">
                <button onClick={() => handleEdit(booking)} className="text-blue-500 hover:text-blue-700">
                  <FaEdit />
                </button>
                <button onClick={() => handleDelete(booking.id)} className="text-red-500 hover:text-red-700">
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl relative">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-2 right-2 text-gray-500">
              <FaTimes />
            </button>
            <h2 className="text-xl font-semibold mb-4">Edit Booking</h2>
            <form onSubmit={(e) => e.preventDefault()} className="grid grid-cols-2 gap-4">
              <div className="mb-4">
                <label className="block text-gray-700">Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth.split('T')[0]} // Format to match input type
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Booking Time</label>
                <input
                  type="datetime-local"
                  name="bookingTime"
                  value={formData.bookingTime.split('T').join('T')} // Format to match input type
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Persons</label>
                <input
                  type="number"
                  name="persons"
                  value={formData.persons}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Message</label>
                <input
                  type="text"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                  rows={2}
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700">Status</label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 p-2 rounded"
                >
                  <option value="PENDING">PENDING</option>
                  <option value="CONFIRMED">CONFIRMED</option>
                  <option value="CANCELLED">CANCELLED</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
            </form>
            <div className="flex justify-end space-x-4 mt-6">
              <button
                onClick={handleSave}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
              >
                Save
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 hover:bg-gray-500 text-gray-700 font-bold py-2 px-4 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
};

export default BookingTable;
