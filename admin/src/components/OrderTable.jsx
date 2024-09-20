import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function OrderTable() {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null);
  const [formData, setFormData] = useState({
    id: '',
    menuName: '',
    quantity: '',
    totalPrice: '',
    status: '',
    userName: '',
    email: '',
    phoneNumber: '',
    paymentMethod: ''
  });

  useEffect(() => {
    axios.get('http://localhost:8081/api/payments')
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        toast.error('Error fetching orders');
        console.error('Error fetching orders:', error.response ? error.response.data : error.message);
      });
  }, []);

  const handleDelete = (orderId) => {
    axios.delete(`http://localhost:8081/api/payments/${orderId}`)
      .then(() => {
        const updatedOrders = orders.filter((order) => order.id !== orderId);
        setOrders(updatedOrders);
        toast.success('Order deleted successfully');
      })
      .catch((error) => {
        toast.error('Error deleting order');
        console.error('Error deleting order:', error.response ? error.response.data : error.message);
      });
  };

  const handleEdit = (order) => {
    setEditingOrder(order.id);
    setFormData(order);
  };

  const handleFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8081/api/payments/${formData.id}`, formData)
      .then((response) => {
        const updatedOrders = orders.map((order) =>
          order.id === formData.id ? response.data : order
        );
        setOrders(updatedOrders);
        setEditingOrder(null);
        toast.success('Order updated successfully');
      })
      .catch((error) => {
        toast.error('Error updating order');
        console.error('Error updating order:', error.response ? error.response.data : error.message);
      });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Pending':
        return 'bg-yellow-200 text-yellow-800';
      case 'Deliverd':
        return 'bg-blue-200 text-blue-800';
      case 'confirmed':
        return 'bg-green-200 text-green-800';
      case 'Ontheway':
        return 'bg-gray-200 text-red-800';
      default:
        return '  bg-red-200 text-gray-800';
    }
  };

  return (
    <div className="mx-auto p-8 mt-2">
      <h2 className="text-2xl font-bold mb-6">Orders</h2>
      <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <thead className="bg-gray-100 border-b border-gray-200">
          <tr>
            <th className="py-2 px-4 border-b">Order ID</th>
            <th className="py-2 px-4 border-b">User Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Phone Number</th>
            <th className="py-2 px-4 border-b">Menu Item</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Total Price</th>
            <th className="py-2 px-4 border-b">Status</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id} className="hover:bg-gray-100">
              <td className="py-4 text-center border-b">{order.id}</td>
              <td className="py-4 text-center border-b">{order.username}</td>
              <td className="py-4 text-center border-b">{order.email}</td>
              <td className="py-4 text-center border-b">{order.phoneNumber}</td>
              <td className="py-4 text-center border-b">{order.itemName}</td>
              <td className="py-4 text-center border-b">{order.itemQuantity}</td>
              <td className="py-4 text-center border-b">
                ${Number(order.totalPrice || 0).toFixed(2)}
              </td>
              <td className="py-4 text-center border-b">
                <span className={`py-2 px-4 rounded-full ${getStatusColor(order.status)}`}>
                  {order.status}
                </span>
              </td>
              <td className="py-2 px-4 border-b text-center">
                <button
                  onClick={() => handleEdit(order)}
                  className="text-blue-600 hover:text-blue-800 transition-colors mr-2"
                >
                  <FaEdit />
                </button>
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

      {editingOrder && (
        <div className="container mx-auto relative">
          <div className="mt-8 p-4 absolute bottom-10 bg-white left-[450px] border border-gray-200 rounded-lg">
            <h3 className="text-xl font-semibold mb-4">Edit Order</h3>
            <form onSubmit={handleFormSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="itemName"
                  value={formData.itemName}
                  onChange={handleFormChange}
                  placeholder="Menu Item"
                  className="p-2 border rounded-lg"
                  required
                />
                <input
                  type="number"
                  name="itemQuantity"
                  value={formData.itemQuantity}
                  onChange={handleFormChange}
                  placeholder="Quantity"
                  className="p-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="totalPrice"
                  value={formData.totalPrice}
                  onChange={handleFormChange}
                  placeholder="Total Price"
                  className="p-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleFormChange}
                  placeholder="User Name"
                  className="p-2 border rounded-lg"
                  required
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleFormChange}
                  placeholder="Email"
                  className="p-2 border rounded-lg"
                  required
                />
                <input
                  type="text"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleFormChange}
                  placeholder="Phone Number"
                  className="p-2 border rounded-lg"
                  required
                />
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleFormChange}
                  className="p-2 border rounded-lg"
                  required
                >
                  <option value="">Select Status</option>
                  <option value="Pending">Pending</option>
                  <option value="Ontheway">Ontheway</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="Deliverd">Deliverd</option>
                  <option value="canceled">Cancelled</option>
                </select>
              </div>
              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}
      <ToastContainer />
    </div>
  );
}

export default OrderTable;
