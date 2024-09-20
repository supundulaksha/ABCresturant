import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = JSON.parse(localStorage.getItem('userData'));
    if (userData) {
      setUserEmail(userData.email);
    }

    // Fetch customer orders from the API
    axios.get('http://localhost:8081/api/payments')
      .then((response) => {
        // Filter orders based on userEmail
        const filteredOrders = response.data.filter(order => order.email === userEmail);
        setOrders(filteredOrders);
      })
      .catch((error) => {
        toast.error('Error fetching orders');
        console.error('Error fetching orders:', error);
      });
  }, [userEmail]);

  const handleDelete = (orderId) => {
    // Delete the order by ID
    axios.delete(`http://localhost:8081/api/payments/${orderId}`)
      .then(() => {
        setOrders(orders.filter(order => order.id !== orderId));
        toast.success('Order deleted successfully!');
      })
      .catch((error) => {
        toast.error('Error deleting order');
        console.error('Error deleting order:', error);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'Processing':
        return 'bg-blue-200 text-blue-800';
      case 'Completed':
        return 'bg-green-200 text-green-800';
      case 'Cancelled':
        return 'bg-red-200 text-red-800';
      default:
        return 'bg-gray-200 text-gray-800';
    }
  };

  return (
    <div className="max-w-6xl py-[200px] mx-auto p-8">
      <h2 className="text-2xl font-bold mb-6">My Orders</h2>
      <table className="min-w-full bg-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">Menu Item</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Total Price</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="py-2 text-center border-b">{order.id}</td>
              <td className="py-2 text-center border-b">{order.itemName}</td>
              <td className="py-2 text-center border-b">{order.itemQuantity}</td>
              <td className="py-2 text-center border-b">
                ${Number(order.totalPrice || 0).toFixed(2)}
              </td>
              <td className="py-2 text-center border-b">
                <h4 className={`py-2 ${getStatusColor(order.status)} rounded-full text-center`}>
                  {order.status}
                </h4>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleDelete(order.id)}
                  className="text-red-600 hover:text-red-800 transition-colors"
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ToastContainer />
    </div>
  );
};

export default MyOrders;
