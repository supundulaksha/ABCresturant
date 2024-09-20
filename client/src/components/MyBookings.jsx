import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify'; // Import toastify
import { FaTrash } from 'react-icons/fa';

function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userEmail, setUserEmail] = useState(null);

  useEffect(() => {
    // Fetch user email from localStorage
    const storedUser = JSON.parse(localStorage.getItem('userData'));
    if (storedUser) {
      setUserEmail(storedUser.email);
    } else {
      toast.error('User email not found in localStorage');
      setIsLoading(false);
      return;
    }

    // Fetch booking data when the component mounts
    const fetchBookings = async () => {
      try {
        const response = await axios.get('http://localhost:8081/api/bookings');
        console.log('Fetched bookings:', response.data); // Debugging line

        // Ensure userEmail is not null and filter bookings based on the email
        if (userEmail) {
          const userBookings = response.data.filter(booking => booking.email === userEmail);
          setBookings(userBookings);
        } else {
          setBookings([]);
        }
      } catch (error) {
        toast.error('Failed to fetch bookings');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, [userEmail]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this booking?')) {
      try {
        await axios.delete(`http://localhost:8081/api/bookings/${id}`);
        // Remove the deleted booking from the state
        setBookings(bookings.filter(booking => booking.id !== id));
        toast.success('Booking deleted successfully');
      } catch (error) {
        toast.error('Failed to delete booking');
      }
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-green-100 text-green-800';
      case 'CANCELED':
        return 'bg-red-100 text-red-800';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="max-w-screen-lg  py-[200px] mx-auto -8 bg-white p-8">
      <h2 className="text-2xl font-bold mb-6">My Bookings</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        bookings.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking Time</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {bookings.map(booking => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{booking.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{booking.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.dateOfBirth).toLocaleDateString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(booking.bookingTime).toLocaleString()}</td>
                  <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium `}><h4 className={`px-6 text-center rounded-full  py-4 whitespace-nowrap text-sm font-medium ${getStatusClass(booking.status)}`}> {booking.status}</h4></td>
                  <td className="px-6 py-4 whitespace-nowrap text-center text-sm font-medium">
                  <button
                  onClick={() => handleDelete(booking.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <FaTrash />
                </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No bookings found.</p>
        )
      )}
    </div>
  );
}

export default MyBookings;
